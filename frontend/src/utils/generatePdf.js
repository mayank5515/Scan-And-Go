import jsPDF from "jspdf";
import "jspdf-autotable";
const generatePDF = ({ jsonData }) => {
  const doc = new jsPDF();
  console.log("jsonData: ", jsonData);
  // Add Title
  doc.setFontSize(18);
  doc.text("Bill Summary", 14, 20);

  // Add some basic information (assuming your JSON has a `status`, `message`, etc.)
  doc.setFontSize(12);
  doc.text(`Status: ${jsonData.status}`, 14, 30);
  doc.text(`Message: ${jsonData.message}`, 14, 40);

  // Check if there’s data and if it has products
  if (jsonData.data && jsonData.data.products) {
    const products = jsonData.data.products;

    // Prepare the data for the table
    const tableData = products.map((product, index) => [
      index + 1,
      product.product_name,
      product.unique_id,
      product.cost_price,
      product.quantity || 1, // Use quantity if available
    ]);

    // Add a table with autoTable
    doc.autoTable({
      head: [["#", "Product Name", "Unique ID", "Cost Price", "Quantity"]],
      body: tableData,
      startY: 50,
    });

    // Add the total amount
    doc.text(
      `Total Amount: $${jsonData.data.total_amount}`,
      14,
      doc.lastAutoTable.finalY + 10
    );
  }

  // Save the PDF locally
  doc.save("BillSummary.pdf");
};

export default generatePDF;
