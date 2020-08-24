//JQuery
$("#cmd").click(function () {
  var opt = {
    margin: 1,
    filename: "ИЗМЕНИ_НАЗВАНИЕ_НА_ИМЯ_РАЗРАБА.pdf",
    image: { type: "png", quality: 1 },
    html2canvas: { scale: 3 },
    jsPDF: {
      unit: "pt",
      format: "a4",
      orientation: "portrait",
    },
  };
  var element = document.getElementById("pdf_cv");
  html2pdf().set(opt).from(element).save();
});
