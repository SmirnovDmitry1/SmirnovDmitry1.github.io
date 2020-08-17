var doc = new jsPDF();

//JQuery
$("#cmd").click(function () {
  console.log("----------click");
  var opt = {
    margin: 1,
    filename: "name.pdf",
    image: { type: "png", quality: 1 }, 
    html2canvas: { scale: 3 },
    jsPDF: {
      unit: "pt",
      format: "a4",
      orientation: "portrait",
    },
  };
  console.log('HEHEHHEHEHEHEHHEHE')
  var element = document.getElementById("pdf_cv");
  html2pdf().set(opt).from(element).save();
});
