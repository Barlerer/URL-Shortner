$('#button').click(function() {
    const origin  = window.location.origin
    let field =  $("#Link");
    let str =  field.val();
    if (!str) {
        $('.alert').removeAttr('hidden');
        setTimeout(()=> {
            $('.alert').attr('hidden', 'true')
        },2500);
        return
    }
    else {
        str = str.toString()
    }

    if (str.toString().match(origin)) {
        return alert('No rerereshort')
    }
    const withHttp = (url: string) => url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match:string, schemma:string, nonSchemmaUrl:string) => schemma ? match : `http://${nonSchemmaUrl}`);
    str = withHttp(str);

    $.post( "api/short", { url: str }, function( data ) {
        console.log( data.longUrl );
        console.log( data.shortUrl ); 
        field.val(origin + "/" + data.shortUrl);
      }, "json");
});