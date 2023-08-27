import React from "react";
import ExcelJS from "exceljs";
import { FiDownload } from "react-icons/fi";
const ExportNotes = ({ notes }) => {
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Notes");

    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Set up columns and data
    worksheet.columns = [
      { header: "Title", key: "title", width: 20 },
      { header: "Body", key: "body", width: 40 },
      { header: "Created", key: "created", width: 15 },
    ];

    // Apply formatting to the header row (make it bold)
    worksheet.getRow(1).font = { bold: true };

    // Add data rows
    notes.forEach((note) => {
      worksheet.addRow({
        title: note.title,
        body: note.body,
        created: formatDate(note.created),
      });
    });

    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "notes.xlsx";
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  };

  return <FiDownload title="Download notes" onClick={handleExport} />;
};

export default ExportNotes;
