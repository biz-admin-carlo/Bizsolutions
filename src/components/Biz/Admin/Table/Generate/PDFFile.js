import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Button, useToast, Tooltip } from '@chakra-ui/react';
import { FaFile } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';

const GeneratePDF = ({ business }) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const generatePDF = async () => {
    try {
      setLoading(true);
      
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
      const { width, height } = page.getSize();
      
      // Load fonts - using Times-Roman for better character support
      const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      const boldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

      
      // Try to load and embed logo
      try {
        const logoResponse = await fetch('https://mybizsolutions.us/static/media/icon-app-logo.83ff8bf39a11df9fb7ac.jpg');
        const logoData = await logoResponse.arrayBuffer();
        const logoImage = await pdfDoc.embedPng(logoData);
        
        page.drawImage(logoImage, {
          x: width - 50 - 100,
          y: height - 100,
          width: 100,
          height: 65,
        });
      } catch (logoError) {
        console.warn('Logo could not be loaded:', logoError);
      }

      // Add header
      page.drawText('MyBizSolutions LLC | Business Details', {
        x: 50,
        y: height - 150,
        font: boldFont,
        size: 16,
      });

      // Business Details
      let currentY = height - 200;
      const lineHeight = 25;

      // Helper function for drawing text
      const drawText = (text, indent = 0) => {
        try {
          page.drawText(text, {
            x: 50 + indent,
            y: currentY,
            font,
            size: 12,
          });
        } catch (error) {
          // If there's an encoding error, try to replace problematic characters
          const sanitizedText = text.replace(/[^\x00-\x7F]/g, '-');
          page.drawText(sanitizedText, {
            x: 50 + indent,
            y: currentY,
            font,
            size: 12,
          });
        }
        currentY -= lineHeight;
      };

      // Draw business information
      drawText(`Business Name: ${business.name}`);
      drawText(`Tracking Log: biz-${business._id.slice(-10)}`);
      drawText(`Agent Name: ${business.agent.firstName} ${business.agent.lastName}`);
      
      // Address Details
      currentY -= lineHeight;
      drawText('Location Details');
      drawText(`City: ${business.location.city || '-'}`, 20);
      drawText(`State: ${business.location.state || '-'}`, 20);
      drawText(`Website: ${business.url || '-'}`, 20);

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      };

      // Status Details
      currentY -= lineHeight;
      drawText('Status Information');
      drawText(`Business Status: ${business.bizStatus || 'Pending'}`, 20);
      drawText(`Payment Status: ${business.paymentStatus || 'Pending'}`, 20);
      drawText(`Created On: ${formatDate(business.createdAt)}`, 20);
      drawText(`Business Age: ${business.bizAge} Days`, 20);

      // Confirmation - Using plain ASCII characters instead of Unicode
      currentY -= lineHeight;
      drawText('Confirmation:');
      drawText('[x] I acknowledge and agree to the BizSolutions LLC Terms & Conditions,', 20);
      drawText('and I fully understand the legal implications of adding this business.', 20);
      drawText(`Confirmed at: ${formatDate(business.createdAt)}`, 20);

      // Footer
      const footerText = 'These following data is to be used by BizSolutions LLC for Website Development & Business Listings purposes';
      page.drawText(footerText, {
        x: 50,
        y: 50,
        font,
        size: 10,
        maxWidth: width - 100,
      });

      // Company tagline
      const tagline = 'In BizSolutions, we\'re more than just a web development company. Your partners in digital success.';
      page.drawText(tagline, {
        x: 50,
        y: 30,
        font,
        size: 10,
        color: rgb(0.4, 0.4, 0.4),
        maxWidth: width - 100,
      });

      // Save the PDF
      const pdfBytes = await pdfDoc.save();
      
      // Create a download link
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `BizSolutions-${business.name}.pdf`;
      link.click();
      
      // Cleanup
      URL.revokeObjectURL(url);
      
      toast({
        title: 'PDF Generated',
        description: 'Business details PDF has been downloaded',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

    } catch (err) {
      console.error('PDF Generation Error:', err);
      toast({
        title: 'Error',
        description: 'Failed to generate PDF',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tooltip label="Download Business Profile" aria-label="Download Business Profile">
        <Button
        size="sm"
        variant="ghost"
        onClick={generatePDF}
        disabled={loading}
        leftIcon={loading ? <Loader2 className="animate-spin" /> : <FaFile />}
        _hover={{ bg: 'transparent', color: 'orange.500' }}
        >
        {loading ? '' : ''}
        </Button>
    </Tooltip>

  );
};

export default GeneratePDF;