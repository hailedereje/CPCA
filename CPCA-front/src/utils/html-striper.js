/**
 * Utility function to remove HTML tags and any styling, returning only the text content.
 * @param {string} html - The HTML string to be cleaned.
 * @returns {string} - The cleaned text content.
 */
export function stripHtmlTags(html) {
    // Create a new DOMParser instance
    const parser = new DOMParser();
    
    // Parse the HTML string into a document
    const doc = parser.parseFromString(html, 'text/html');
    
    // Use textContent to get the text content of the document, which strips away all HTML tags
    const text = doc.body.textContent || '';
  
    // Return the cleaned text content
    return text;
  }
  
  