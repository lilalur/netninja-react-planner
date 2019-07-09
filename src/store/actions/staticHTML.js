// Wait for the page to load first
window.onload = () => {

    const pageCreator = document.getElementById("exportxt");

    pageCreator.onClick = () => {
        function downloadInnerHtml(filename, elId, mimeType) {
            const elHtml = document.getElementById(elId).innerHTML;
            const link = document.createElement('a');
        mimeType = mimeType || 'text/plain';
        link.setAttribute('download', filename);
        link.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(elHtml));
        link.click(); 
        }
        const fileName =  'myexportedhtml.html';
        downloadInnerHtml(fileName, 'editor','text/plain');
      return false;
    }
  }