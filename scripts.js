document.getElementById('domainForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Capture form data
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const domainName = document.getElementById('domainName').value;
  const domainList = document.getElementById('domainList').value;
  const today = new Date().toLocaleDateString();

  // Generate cover letter
  const coverLetter = `
    
    <div class="header">
      <p><strong>Full Name:</strong> ${fullName}<br>
      <strong>Email:</strong> ${email}<br>
      <strong>Mobile:</strong> ${phoneNumber}<br>
      <strong>Date:</strong> ${today}</p>
    </div>
    <p>The HostMaster<br>
    NP ccTLD Registration Services<br>
    Mercantile Communications Pvt. Ltd.<br>
    Email: hostmaster@mercantile.com.np</p>
    <div class="subject">
      <p><strong>Subject:</strong> Application for ${domainName}.${domainList} domain registration</p>
    </div>
    <p>Dear Sir/Madam,</p>
    <p>I am writing to request the registration of a domain under my name ${fullName} with domain ${domainName}.${domainList}.</p>
    
    <p>Applying for registration of the domain ${domainName}.${domainList} follows all the terms and conditions of Domain registration residing at “<a href="https://register.com.np/terms-and-conditions">https://register.com.np/terms-and-conditions</a>”. I submit the required documents for the domain registration as per the rule.</p>
    
    <p>Thank you for “helping the industry and civil society to make them online”. Entry area for .com.np is "commercial" and Notes is "open ccTLD, any person or entity is permitted to register" as mentioned on “<a href="https://register.com.np/np-ccTLDs">https://register.com.np/np-ccTLDs</a>”.</p>
    
    <p>I would be very grateful indeed for your help. Needless to say, I will be glad to supply you with any further information you may need. I look forward to hearing from you soon.</p>
    
    <p>Your Sincerely,<br>${fullName}</p>
  `;
    
  // Display cover letter
  document.getElementById('coverLetter').innerHTML = coverLetter;

  // Show download button
  document.getElementById('downloadButton').style.display = 'block';
});

document.getElementById('downloadButton').addEventListener('click', function() {
  html2canvas(document.getElementById('coverLetter')).then(function(canvas) {
    const link = document.createElement('a');
    link.download = 'cover-letter.jpeg';
    link.href = canvas.toDataURL('image/jpeg');
    link.click();
  });
});
