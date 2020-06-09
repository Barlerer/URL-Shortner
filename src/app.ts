import express, { Request, Response } from 'express';
import { createConnection, Connection, getRepository, getManager } from "typeorm";
import "reflect-metadata";
import { Url } from './entity/Url.entity';
import shortid from 'shortid';
import path from 'path';

//
const app = express();

app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 600 })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', (req: Request, res: Response) => {
  return res.render('mypage')
})

app.get('/:code', async (req: Request, res: Response) => {
  const urlRepo = getRepository(Url)
  const url = await urlRepo.findOne({ shortUrl: req.params.code });
  if (!url) {
    return res.status(400).send("Bad link, check again")
  }
  return res.redirect(url.longUrl);
})
//Link must start with http or https//
app.post("/api/short/", async (req: Request, res: Response) => {

  const longUrl = req.body.url;
  let input
  try {
    if (longUrl.startsWith("http://") || longUrl.startsWith("https://"))
      input = new URL(longUrl)
    else
      throw 'no HTTP'
  } catch (error) {
    return res.status(400).send("Bad URL")
  }
  const urlRepo = getRepository(Url)
  let url = new Url();
  url.longUrl = input.toString();
  url.shortUrl = shortid.generate();
  return res.send(await urlRepo.save(url));
})

export default app