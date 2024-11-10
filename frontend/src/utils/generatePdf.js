import jsPDF from "jspdf";
import "jspdf-autotable";
const generatePDF = ({ jsonData }) => {
  const doc = new jsPDF();
  console.log("jsonData: ", jsonData);

  // Add Title
  doc.setFontSize(18);
  doc.text("Bill Summary", 14, 20);

  // Add Bill Information
  doc.setFontSize(12);
  doc.text(`Bill Date: ${jsonData.bill_date}`, 14, 30);
  doc.text(`Bill Time: ${jsonData.bill_time}`, 14, 40);
  doc.text(`Customer Phone: ${jsonData.customer_phoneNumber}`, 14, 50);

  // Check if there’s data and if it has products
  if (jsonData.products) {
    const products = jsonData.products;

    // Prepare the data for the table
    const tableData = products.map((product, index) => [
      index + 1,
      product.product_name,
      product.unique_id,
      `Rs:  ${product.cost_price}`, // Add currency symbol
      product.quantity || 1, // Use quantity if available
    ]);

    // Add a table with autoTable
    doc.autoTable({
      head: [["#", "Product Name", "Unique ID", "Cost Price", "Quantity"]],
      body: tableData,
      startY: 60, // Adjust start Y position to leave space for bill details
    });

    // Add the total amount
    doc.text(
      `Total Bill: Rs ${jsonData.total_amount}`,
      14,
      doc.lastAutoTable.finalY + 10 // Positioning the total amount after the table
    );
  }

  // Save the PDF locally
  doc.save("BillSummary.pdf");
};
export default generatePDF;
