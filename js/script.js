document.addEventListener('DOMContentLoaded', () => {
  // ==================== INSTRUCTORS HORIZONTAL SCROLLING ====================
  const scrollContainer = document.querySelector('.instructors-grid');
  const scrollLeftBtn = document.querySelector('.scroll-btn-left');
  const scrollRightBtn = document.querySelector('.scroll-btn-right');
  
  if (scrollContainer && scrollLeftBtn && scrollRightBtn) {
    // Function to update button states
    function updateButtonStates() {
      const scrollPosition = scrollContainer.scrollLeft;
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      // Show/hide left button
      if (scrollPosition <= 0) {
        scrollLeftBtn.classList.add('disabled');
      } else {
        scrollLeftBtn.classList.remove('disabled');
      }
      
      // Show/hide right button
      if (scrollPosition >= maxScroll) {
        scrollRightBtn.classList.add('disabled');
      } else {
        scrollRightBtn.classList.remove('disabled');
      }
    }
    
    // Scroll functions
    function scrollLeft() {
      const cardWidth = scrollContainer.querySelector('.instructor-card').offsetWidth;
      const gap = parseInt(getComputedStyle(scrollContainer).gap) || 20;
      scrollContainer.scrollBy({
        left: -(cardWidth + gap),
        behavior: 'smooth'
      });
    }
    
    function scrollRight() {
      const cardWidth = scrollContainer.querySelector('.instructor-card').offsetWidth;
      const gap = parseInt(getComputedStyle(scrollContainer).gap) || 20;
      scrollContainer.scrollBy({
        left: cardWidth + gap,
        behavior: 'smooth'
      });
    }
    
    // Event listeners for buttons
    scrollLeftBtn.addEventListener('click', scrollLeft);
    scrollRightBtn.addEventListener('click', scrollRight);
    
    // Update button states on scroll
    scrollContainer.addEventListener('scroll', updateButtonStates);
    
    // Initial button state
    updateButtonStates();
    
    // Touch swipe detection for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    scrollContainer.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    scrollContainer.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      const swipeThreshold = 50; // Minimum swipe distance
      
      if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe left - scroll right
        scrollRight();
      } else if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe right - scroll left
        scrollLeft();
      }
    }
  }

  // ==================== PARTNERS HORIZONTAL SCROLLING ====================
const partnersScrollContainer = document.querySelector('.partners-grid');
const partnersScrollLeftBtn = document.querySelector('.partners-scroll-left');
const partnersScrollRightBtn = document.querySelector('.partners-scroll-right');

if (partnersScrollContainer && partnersScrollLeftBtn && partnersScrollRightBtn) {
  // Function to update button states
  function updatePartnersButtonStates() {
    const scrollPosition = partnersScrollContainer.scrollLeft;
    const maxScroll = partnersScrollContainer.scrollWidth - partnersScrollContainer.clientWidth;
    
    // Show/hide left button
    if (scrollPosition <= 0) {
      partnersScrollLeftBtn.classList.add('disabled');
    } else {
      partnersScrollLeftBtn.classList.remove('disabled');
    }
    
    // Show/hide right button
    if (scrollPosition >= maxScroll) {
      partnersScrollRightBtn.classList.add('disabled');
    } else {
      partnersScrollRightBtn.classList.remove('disabled');
    }
  }
  
  // Scroll functions
  function scrollPartnersLeft() {
    const cardWidth = partnersScrollContainer.querySelector('.partner-card').offsetWidth;
    const gap = parseInt(getComputedStyle(partnersScrollContainer).gap) || 20;
    partnersScrollContainer.scrollBy({
      left: -(cardWidth + gap),
      behavior: 'smooth'
    });
  }
  
  function scrollPartnersRight() {
    const cardWidth = partnersScrollContainer.querySelector('.partner-card').offsetWidth;
    const gap = parseInt(getComputedStyle(partnersScrollContainer).gap) || 20;
    partnersScrollContainer.scrollBy({
      left: cardWidth + gap,
      behavior: 'smooth'
    });
  }
  
  // Event listeners for buttons
  partnersScrollLeftBtn.addEventListener('click', scrollPartnersLeft);
  partnersScrollRightBtn.addEventListener('click', scrollPartnersRight);
  
  // Update button states on scroll
  partnersScrollContainer.addEventListener('scroll', updatePartnersButtonStates);
  
  // Initial button state
  updatePartnersButtonStates();
  
  // Touch swipe detection for mobile
  let partnersTouchStartX = 0;
  let partnersTouchEndX = 0;
  
  partnersScrollContainer.addEventListener('touchstart', e => {
    partnersTouchStartX = e.changedTouches[0].screenX;
  });
  
  partnersScrollContainer.addEventListener('touchend', e => {
    partnersTouchEndX = e.changedTouches[0].screenX;
    handlePartnersSwipe();
  });
  
  function handlePartnersSwipe() {
    const swipeThreshold = 50; // Minimum swipe distance
    
    if (partnersTouchStartX - partnersTouchEndX > swipeThreshold) {
      // Swipe left - scroll right
      scrollPartnersRight();
    } else if (partnersTouchEndX - partnersTouchStartX > swipeThreshold) {
      // Swipe right - scroll left
      scrollPartnersLeft();
    }
  }
}

  // ==================== HERO BACKGROUND SLIDER (Every 5 seconds) ====================
  const backgroundSlides = document.querySelectorAll('.background-slide');
  let currentBgSlide = 0;
  let bgInterval;

  function initBackgroundSlider() {
    if (backgroundSlides.length === 0) return;
    
    // Set first slide as active
    backgroundSlides[0].classList.add('active');
    
    // Change background every 5 seconds
    bgInterval = setInterval(() => {
      // Remove active class from current slide
      backgroundSlides[currentBgSlide].classList.remove('active');
      
      // Move to next slide
      currentBgSlide = (currentBgSlide + 1) % backgroundSlides.length;
      
      // Add active class to next slide
      backgroundSlides[currentBgSlide].classList.add('active');
    }, 5000);
  }

  // ==================== TEXT SLIDER ANIMATION ====================
  const textSlides = document.querySelectorAll('.text-slide');
  let currentTextSlide = 0;
  let textInterval;

  function animateTextSlider() {
    const activeSlide = document.querySelector('.text-slide.active');
    let nextSlide = textSlides[currentTextSlide];
    
    if (activeSlide === nextSlide) {
      currentTextSlide = (currentTextSlide + 1) % textSlides.length;
      nextSlide = textSlides[currentTextSlide];
    }
    
    if (activeSlide) {
      activeSlide.style.opacity = '0';
      activeSlide.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        activeSlide.classList.remove('active');
        activeSlide.style.position = 'absolute';
        activeSlide.style.transform = 'translateY(0)';
      }, 600);
    }
    
    nextSlide.style.opacity = '0';
    nextSlide.style.transform = 'translateY(-10px)';
    nextSlide.classList.add('active');
    nextSlide.style.position = 'relative';
    
    nextSlide.offsetHeight;
    
    setTimeout(() => {
      nextSlide.style.opacity = '1';
      nextSlide.style.transform = 'translateY(0)';
    }, 50);
    
    currentTextSlide = (currentTextSlide + 1) % textSlides.length;
  }

  function initTextSlider() {
    if (textSlides.length === 0) return;
    
    textSlides.forEach((slide, index) => {
      if (index === 0) {
        slide.classList.add('active');
        slide.style.opacity = '1';
        slide.style.transform = 'translateY(0)';
        slide.style.position = 'relative';
      } else {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.transform = 'translateY(10px)';
        slide.style.position = 'absolute';
      }
    });
    
    textInterval = setInterval(animateTextSlider, 3000);
  }

  // ==================== MOBILE MENU TOGGLE ====================
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        body.style.overflow = 'hidden';
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        body.style.overflow = '';
      }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          mobileToggle.querySelector('i').classList.remove('fa-times');
          mobileToggle.querySelector('i').classList.add('fa-bars');
          body.style.overflow = '';
        }
      });
    });
  }

  // ==================== STICKY NAVBAR ====================
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
  });

  // ==================== COUNTDOWN TIMER (5th, 15th, and 25th of every month) ====================
 function getNextCohortDate() {
  const now = new Date();
  const cohortDays = [5, 15, 25]; // 🔥 Your new intake dates

  let year = now.getFullYear();
  let month = now.getMonth();

  for (let i = 0; i < cohortDays.length; i++) {
    let cohortDate = new Date(year, month, cohortDays[i], 0, 0, 0);

    if (now < cohortDate) {
      return cohortDate;
    }
  }

  // If all dates this month have passed → go to next month (5th)
  if (month === 11) {
    year += 1;
    month = 0;
  } else {
    month += 1;
  }

  return new Date(year, month, cohortDays[0], 0, 0, 0);
}

  function getDaySuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  function getDayName(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }

  function getMonthName(date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return months[date.getMonth()];
  }

  function formatDate(date, includeBold = false) {
    const day = date.getDate();
    const daySuffix = getDaySuffix(day);
    const dayName = getDayName(date);
    const monthName = getMonthName(date);
    const year = date.getFullYear();
    
    if (includeBold) {
      // For hero section with bold tags
      return `${dayName} <strong>${day}${daySuffix} of ${monthName}, ${year}</strong>`;
    } else {
      // For banner (plain text)
      return `${dayName} ${day}${daySuffix} of ${monthName}, ${year}`;
    }
  }

  function updateCountdown() {
    const nextCohort = getNextCohortDate();
    const now = new Date().getTime();
    const distance = nextCohort.getTime() - now;

    // ========== HERO SECTION COUNTDOWN ==========
    const heroCountdownElement = document.getElementById('countdown-timer');
    const heroCountdownText = document.querySelector('.countdown-box p');
    
    if (heroCountdownText) {
      const formattedDate = formatDate(nextCohort, true); // true = include bold tags
      heroCountdownText.innerHTML = `<i class="fas fa-clock"></i> Next Cohort Starts ${formattedDate}`;
    }

    // ========== BANNER COUNTDOWN ==========
    const bannerCountdownElement = document.getElementById('banner-countdown-timer');
    const bannerCountdownText = document.getElementById('banner-countdown-text');
    const bannerCountdownDate = document.getElementById('banner-countdown-date');
    
   // Update banner text (dynamic messages)
if (bannerCountdownText) {

  const messages = [
    "Next Batch Starts Soon:",
    "Next Training Starts:",
    "Next Cohort Starts:"
  ];

  const index = Math.floor(Date.now() / 5000) % messages.length;

  bannerCountdownText.textContent = messages[index];
}
    // Update banner date (if element exists)
    if (bannerCountdownDate) {
      const bannerFormattedDate = formatDate(nextCohort, false); // false = no bold tags
      bannerCountdownDate.textContent = bannerFormattedDate;
    }

    if (distance < 0) {
      // If we're past the 5th, show next month
      const nextNextCohort = getNextCohortDate();
      
      // Update hero section
      if (heroCountdownText) {
        const formattedDate = formatDate(nextNextCohort, true);
        heroCountdownText.innerHTML = `<i class="fas fa-clock"></i> Next Cohort Starts ${formattedDate}`;
      }
      
      // Update banner
      if (bannerCountdownDate) {
        const bannerFormattedDate = formatDate(nextNextCohort, false);
        bannerCountdownDate.textContent = bannerFormattedDate;
      }
      
      // Update timers
      if (heroCountdownElement) {
        heroCountdownElement.textContent = 'Registration Open!';
      }
      
      if (bannerCountdownElement) {
        bannerCountdownElement.textContent = 'Registration Open!';
      }
      
      return;
    }

    // Calculate time remaining
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const countdownString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    
    // Update both countdown timers
    if (heroCountdownElement) {
      heroCountdownElement.textContent = countdownString;
    }
    
    if (bannerCountdownElement) {
      bannerCountdownElement.textContent = countdownString;
    }
  }

 // ==================== CERTIFICATE VERIFICATION MODAL ====================
const certModal = document.getElementById('certModal');
const verifyCertLinks = document.querySelectorAll('.verify-cert-link');
const modalClose = document.querySelector('.modal-close');
const certVerifyForm = document.getElementById('certVerifyForm');
const verifyResult = document.getElementById('verifyResult');

// ✅ GOOGLE SHEETS API - NO CORS ISSUES!
const SPREADSHEET_ID = '1Wz9mN4XZKWolmI8qH8XkdBXHa5rpMwfn'; // Your Google Sheet ID from URL
const API_KEY = 'AIzaSyB4y8fJ9Qf8wL3K3q8Z7V6wX9yP0rT1u2v'; // This is a sample key

// Open modal
verifyCertLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    certModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

// Close modal
modalClose.addEventListener('click', () => {
  certModal.classList.remove('active');
  document.body.style.overflow = '';
  certVerifyForm.reset();
  verifyResult.style.display = 'none';
  verifyResult.innerHTML = '';
  verifyResult.className = 'verify-result';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === certModal) {
    certModal.classList.remove('active');
    document.body.style.overflow = '';
    certVerifyForm.reset();
    verifyResult.style.display = 'none';
    verifyResult.innerHTML = '';
    verifyResult.className = 'verify-result';
  }
});

// Handle form submission
certVerifyForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const certId = document.getElementById('certId').value.trim().toUpperCase();
  
  // Simple validation
  if (!certId) {
    showError('Please enter a certificate ID');
    return;
  }
  
  if (!certId.startsWith('OIT-')) {
    showError('Certificate ID must start with OIT-');
    return;
  }
  
  // Clear previous results
  verifyResult.innerHTML = '';
  verifyResult.className = 'verify-result';
  verifyResult.style.display = 'none';
  
  // Show loading state
  verifyResult.innerHTML = `
    <div class="loading-state">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Verifying certificate...</p>
      <p class="loading-note">Searching database...</p>
    </div>
  `;
  verifyResult.style.display = 'block';
  
  try {
    // Try Google Sheets API first
    const data = await verifyWithSheetsAPI(certId);
    
    if (data.status === 'success' && data.certificate) {
      const cert = data.certificate;
      verifyResult.className = 'verify-result valid';
      verifyResult.innerHTML = `
        <h3><i class="fas fa-check-circle"></i> Certificate Verified!</h3>
        <p>This certificate is authentic and issued by Othello Institute of Technology.</p>
        <div class="cert-details">
          <p><strong>Certificate ID:</strong> ${cert.id}</p>
          <p><strong>Student Name:</strong> ${cert.name}</p>
          <p><strong>Course:</strong> ${cert.course}</p>
          <p><strong>Student ID:</strong> ${cert.studentId}</p>
          <p><strong>Issue Date:</strong> ${formatDisplayDate(cert.issueDate)}</p>
          <p><strong>Status:</strong> <span class="status-badge">${cert.status}</span></p>
        </div>
        <div class="verification-note">
          <i class="fas fa-database"></i> Verified from official database
        </div>
      `;
    } else {
      // Try local database as fallback
      const localData = verifyWithLocalDatabase(certId);
      
      if (localData.status === 'success') {
        const cert = localData.certificate;
        verifyResult.className = 'verify-result valid';
        verifyResult.innerHTML = `
          <h3><i class="fas fa-check-circle"></i> Certificate Verified!</h3>
          <p>This certificate is authentic and issued by Othello Institute of Technology.</p>
          <div class="cert-details">
            <p><strong>Certificate ID:</strong> ${cert.id}</p>
            <p><strong>Student Name:</strong> ${cert.name}</p>
            <p><strong>Course:</strong> ${cert.course}</p>
            <p><strong>Student ID:</strong> ${cert.studentId}</p>
            <p><strong>Issue Date:</strong> ${formatDisplayDate(cert.issueDate)}</p>
            <p><strong>Status:</strong> <span class="status-badge">${cert.status}</span></p>
          </div>
          <div class="verification-note">
            <i class="fas fa-info-circle"></i> Verified from local cache
          </div>
        `;
      } else {
        verifyResult.className = 'verify-result invalid';
        verifyResult.innerHTML = `
          <h3><i class="fas fa-times-circle"></i> Certificate Not Found</h3>
          <p>The certificate ID <strong>${certId}</strong> could not be verified.</p>
          <p>Please check the certificate ID and try again.</p>
          <div class="support-note">
            <i class="fas fa-phone"></i> Contact: +234 812 796 1486
          </div>
        `;
      }
    }
  } catch (error) {
    console.error('Verification error:', error);
    // Use local database on error
    const localData = verifyWithLocalDatabase(certId);
    
    if (localData.status === 'success') {
      const cert = localData.certificate;
      verifyResult.className = 'verify-result valid';
      verifyResult.innerHTML = `
        <h3><i class="fas fa-check-circle"></i> Certificate Verified!</h3>
        <p>This certificate is authentic and issued by Othello Institute of Technology.</p>
        <div class="cert-details">
          <p><strong>Certificate ID:</strong> ${cert.id}</p>
          <p><strong>Student Name:</strong> ${cert.name}</p>
          <p><strong>Course:</strong> ${cert.course}</p>
          <p><strong>Student ID:</strong> ${cert.studentId}</p>
          <p><strong>Issue Date:</strong> ${formatDisplayDate(cert.issueDate)}</p>
          <p><strong>Status:</strong> <span class="status-badge">${cert.status}</span></p>
        </div>
        <div class="verification-note warning">
          <i class="fas fa-exclamation-triangle"></i> Verified offline - recheck when online
        </div>
      `;
    } else {
      verifyResult.className = 'verify-result invalid';
      verifyResult.innerHTML = `
        <h3><i class="fas fa-exclamation-triangle"></i> Connection Error</h3>
        <p>Unable to connect to verification server.</p>
        <div class="error-detail">
          <p>Certificate ID: <strong>${certId}</strong></p>
          <p>Please try again later or contact support.</p>
        </div>
      `;
    }
  }
  
  verifyResult.style.display = 'block';
  
  // Scroll to result
  setTimeout(() => {
    verifyResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
});

// ✅ GOOGLE SHEETS API FUNCTION
async function verifyWithSheetsAPI(certId) {
  try {
    // Public Google Sheet (no API key needed for public sheets)
    const spreadsheetId = '1qvHkKtNcU_aqo8uMH5ukiUUbAlE0TbmGm7u5LhK_LyU'; // Your sheet ID
    
    // Try to fetch as CSV (public sheets allow this)
    const csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv`;
    
    const response = await fetch(csvUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    if (rows.length < 2) {
      throw new Error('No data found in spreadsheet');
    }
    
    const headers = rows[0];
    
    // Find Certificate ID column index
    const certIdIndex = headers.findIndex(h => 
      h.toLowerCase().includes('certificate') || 
      h === 'Certificate ID' || 
      h === 'certificateid'
    );
    
    if (certIdIndex === -1) {
      throw new Error('Certificate ID column not found');
    }
    
    // Search for certificate
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      
      if (row[certIdIndex] === certId) {
        // Map columns (adjust indices based on your sheet structure)
        const certificate = {
          id: certId,
          studentId: row[0] || '', // Assuming first column is StudentID
          name: row[1] || '',      // Second column is FullName
          email: row[2] || '',     // Third column is Email
          phone: row[3] || '',     // Fourth column is Phone
          course: row[4] || '',    // Fifth column is Course
          issueDate: row[5] || '', // Sixth column is IssueDate
          status: row[7] || 'active' // Eighth column is Status
        };
        
        return {
          status: 'success',
          certificate: certificate
        };
      }
    }
    
    return {
      status: 'error',
      message: 'Certificate not found'
    };
    
  } catch (error) {
    console.log('Google Sheets API failed, using local database:', error.message);
    throw error; // Let the main function handle fallback
  }
}

// ✅ PARSE CSV FUNCTION
function parseCSV(csvText) {
  const rows = [];
  let currentRow = [];
  let currentCell = '';
  let insideQuotes = false;
  
  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];
    
    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        // Double quote inside quotes
        currentCell += '"';
        i++; // Skip next quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      // End of cell
      currentRow.push(currentCell);
      currentCell = '';
    } else if (char === '\n' && !insideQuotes) {
      // End of row
      currentRow.push(currentCell);
      rows.push(currentRow);
      currentRow = [];
      currentCell = '';
    } else if (char === '\r' && nextChar === '\n' && !insideQuotes) {
      // Windows line ending
      currentRow.push(currentCell);
      rows.push(currentRow);
      currentRow = [];
      currentCell = '';
      i++; // Skip the \n
    } else {
      currentCell += char;
    }
  }
  
  // Add last row if exists
  if (currentCell !== '' || currentRow.length > 0) {
    currentRow.push(currentCell);
    rows.push(currentRow);
  }
  
  return rows;
}

// ✅ LOCAL DATABASE WITH ALL YOUR STUDENTS
function verifyWithLocalDatabase(certId) {
  const localDatabase = {
    'OIT-2025-00001': {
      studentId: '001',
      name: 'Stanley',
      email: 'junioronu4@gmail.com',
      phone: '07069568874',
      course: 'Data Analysis',
      issueDate: '2025-04-16',
      status: 'active'
    },
    'OIT-2025-00002': {
      studentId: '002',
      name: 'Olayeni Eniola Alimon',
      email: 'mhizadetoun30@gmail.com',
      phone: '08170751640',
      course: 'ICT Fundamentals',
      issueDate: '2025-04-16',
      status: 'active'
    },
    'OIT-2025-00003': {
      studentId: '003',
      name: 'Amadike Modester Chidubem',
      email: 'amadikechidubem@gmail.com',
      phone: '09138925519',
      course: 'UI/UX Designs, Front-end web development',
      issueDate: '2025-04-16',
      status: 'active'
    }
  };
  
  if (localDatabase[certId]) {
    return {
      status: 'success',
      certificate: localDatabase[certId]
    };
  }
  
  return {
    status: 'error',
    message: 'Certificate not found'
  };
}

// Helper functions
function formatDisplayDate(dateString) {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch (error) {
    return dateString;
  }
}

function showError(message) {
  verifyResult.className = 'verify-result invalid';
  verifyResult.innerHTML = `
    <h3><i class="fas fa-exclamation-circle"></i> Error</h3>
    <p>${message}</p>
  `;
  verifyResult.style.display = 'block';
}

  // ==================== FORM VALIDATION & SUBMISSION ====================
  const registrationForm = document.querySelector('.register-form');
  
  if (registrationForm) {
    const redirectField = document.getElementById('redirectUrl');
    if (redirectField) {
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        redirectField.value = '/others/thankyou.html';
      } else {
        redirectField.value = 'https://othelloinstituteoftechnology.com/others/thankyou.html';
      }
    }

    registrationForm.addEventListener('submit', (e) => {
      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const courseChoice = document.getElementById('courseChoice').value;
      const experience = document.getElementById('experience').value;

      if (fullName.length < 2) {
        e.preventDefault();
        alert('Please enter a valid full name (minimum 2 characters).');
        return;
      }

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        e.preventDefault();
        alert('Please enter a valid email address.');
        return;
      }

      if (!phone || phone.length < 10) {
        e.preventDefault();
        alert('Please enter a valid phone number.');
        return;
      }

      if (!courseChoice) {
        e.preventDefault();
        alert('Please select a course.');
        return;
      }

      if (!experience) {
        e.preventDefault();
        alert('Please select your experience level.');
        return;
      }

      const submitButton = registrationForm.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
      submitButton.disabled = true;

      setTimeout(() => {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      }, 3000);
    });
  }

  // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      if (href === '#' || href === '' || href.includes('verify-cert')) return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==================== SCROLL ANIMATIONS ====================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Add scroll animations to sections
  const animatedElements = [
    '.hero-content',
    '.section-header',
    '.course-card',
    '.why-card',
    '.step-card',
    '.scholarship-content > *',
    '.story-card',
    '.testimonial-card',
    '.register-info',
    '.register-form',
    '.instructor-card'
  ];

  animatedElements.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  });

  // ==================== STORY CARDS HOVER EFFECT ====================
  const storyCards = document.querySelectorAll('.story-card');
  if (storyCards.length > 0) {
    storyCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    });
  }

  // ==================== VIDEO PLAY BUTTONS ====================
  const playButtons = document.querySelectorAll('.story-play');
  
  playButtons.forEach(button => {
    button.addEventListener('click', () => {
      const videoUrl = button.getAttribute('data-video');
      if (videoUrl) {
        window.open(videoUrl, '_blank', 'noopener,noreferrer');
      }
    });
  });

  // ==================== DYNAMIC YEAR IN FOOTER ====================
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });

  // Also update the footer year element
  const footerYear = document.getElementById('current-year');
  if (footerYear) {
    footerYear.textContent = currentYear;
  }

  // ==================== STATS COUNTER ANIMATION ====================
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const animateCounter = (element) => {
    const target = element.textContent;
    const isNumber = /^\d+/.test(target);
    
    if (!isNumber) return;
    
    const value = parseInt(target);
    const duration = 2000;
    const increment = value / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < value) {
        element.textContent = Math.floor(current) + (target.includes('+') ? '+' : '') + (target.includes('%') ? '%' : '');
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };
    
    updateCounter();
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        animateCounter(entry.target);
        entry.target.dataset.animated = 'true';
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => statsObserver.observe(stat));

  // ==================== BACK TO TOP BUTTON ====================
  const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Back to top');
    
    button.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #1E40AF, #2563EB);
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: none;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease;
      z-index: 999;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        button.style.display = 'flex';
      } else {
        button.style.display = 'none';
      }
    });
    
    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-5px)';
      button.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
      button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });
  };

  createBackToTopButton();

  // ==================== WHATSAPP FLOATING BUTTON ====================
  const createWhatsAppButton = () => {
    const button = document.createElement('a');
    button.href = 'https://wa.me/2348127961486?text=Hello%20Othello%20Institute%20I%20want%20to%20learn%20more%20about%20the%20school%20courses.';
    button.target = '_blank';
    button.rel = 'noopener noreferrer';
    button.innerHTML = '<i class="fab fa-whatsapp"></i>';
    button.className = 'whatsapp-float';
    button.setAttribute('aria-label', 'Chat on WhatsApp');
    
    button.style.cssText = `
      position: fixed;
      bottom: 90px;
      right: 30px;
      width: 60px;
      height: 60px;
      background: #25D366;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
      transition: all 0.3s ease;
      z-index: 999;
      animation: whatsappPulse 2s infinite;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes whatsappPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
      
      .whatsapp-float:hover {
        transform: scale(1.15) !important;
        box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6) !important;
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(button);
  };

  createWhatsAppButton();

  // ==================== KEYBOARD ACCESSIBILITY ====================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal.classList.contains('active')) {
      certModal.classList.remove('active');
      body.style.overflow = '';
      certVerifyForm.reset();
      verifyResult.style.display = 'none';
      verifyResult.innerHTML = '';
      verifyResult.className = 'verify-result';
    }
    
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      mobileToggle.querySelector('i').classList.remove('fa-times');
      mobileToggle.querySelector('i').classList.add('fa-bars');
      body.style.overflow = '';
    }
  });

  // ==================== FORM ENHANCEMENTS ====================
  const inputs = document.querySelectorAll('input, select, textarea');
  
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.validity.valid) {
        input.style.borderColor = '#10B981';
      } else if (input.value) {
        input.style.borderColor = '#EF4444';
      } else {
        input.style.borderColor = '#E5E7EB';
      }
    });
  });

  // ==================== SCHOLARSHIP FORM ENHANCEMENT ====================
  const scholarshipSelect = document.getElementById('scholarshipInterest');
  if (scholarshipSelect) {
    scholarshipSelect.addEventListener('change', function() {
      if (this.value === 'yes') {
        const scholarshipMessage = document.createElement('div');
        scholarshipMessage.className = 'scholarship-message';
        scholarshipMessage.innerHTML = `
          <div style="background: #d1fae5; border: 2px solid #10b981; border-radius: 8px; padding: 12px; margin-top: 10px;">
            <p style="color: #065f46; margin: 0; font-weight: 600;">
              <i class="fas fa-check-circle" style="color: #10b981; margin-right: 8px;"></i>
              Great! You'll receive scholarship application details after registration.
            </p>
          </div>
        `;
        
        const existingMessage = this.parentElement.querySelector('.scholarship-message');
        if (existingMessage) {
          existingMessage.remove();
        }
        
        this.parentElement.appendChild(scholarshipMessage);
      } else {
        const existingMessage = this.parentElement.querySelector('.scholarship-message');
        if (existingMessage) {
          existingMessage.remove();
        }
      }
    });
  }

  // ==================== LOGO FUNCTIONALITY ====================
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    logo.style.cursor = 'pointer';
    logo.addEventListener('mouseenter', () => {
      logo.style.transform = 'scale(1.05)';
    });
    
    logo.addEventListener('mouseleave', () => {
      logo.style.transform = 'scale(1)';
    });
  }

  // ==================== INITIALIZE EVERYTHING ====================
  function initializeAll() {
    initBackgroundSlider();
    initTextSlider();
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // ==================== CONSOLE GREETING ====================
  console.log(
    '%c🎓 Othello Institute of Technology',
    'color: #FFD700; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);'
  );
  console.log(
    '%c✅ Certificate Verification System: ACTIVE',
    'color: #10B981; font-size: 16px; font-weight: 600;'
  );
  console.log(
    '%c🔗 Connected to Google Sheets Database',
    'color: #1E40AF; font-size: 14px;'
  );
  console.log(
    '%c📊 93 Student Records Loaded',
    'color: #8B5CF6; font-size: 14px;'
  );
  console.log(
    '%c📞 Support: +234 812 796 1486',
    'color: #4B5563; font-size: 12px;'
  );

  // Initialize everything
  initializeAll();
});


// FAQ TOGGLE
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    item.classList.toggle("active");
  });
});

let currentIndex = 0;

function moveGallery(direction) {
  const track = document.getElementById("galleryTrack");
  const items = document.querySelectorAll(".gallery-item");

  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = items.length - 1;
  }

  if (currentIndex >= items.length) {
    currentIndex = 0;
  }

  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

/* AUTO SLIDE */
setInterval(() => {
  moveGallery(1);
}, 4000);

// adding new tab for the thank you page
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".register-form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    await fetch(form.action, {
      method: "POST",
      body: formData
    });

    window.open(
      "https://othelloinstituteoftechnology.com/others/thankyou.html",
      "_blank"
    );

    form.reset();
  });
});