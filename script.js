// Firebase configuration object
const firebaseConfig = {
  //paste your firebase config information

  
};

// Initialize Firebase with the provided configuration
firebase.initializeApp(firebaseConfig);

// Form handling object for managing the contact form
const contactFormHandler = {
  // Reference to the "contactForm" node in Firebase Realtime Database
  dbRef: firebase.database().ref("contactForm"),

  // Initialization function to set up the event listener for the form submission
  init: function() {
    document.getElementById("contactForm").addEventListener("submit", this.submitForm.bind(this));
  },

  // Function to handle form submission
  submitForm: function(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get values from the form input fields
    const name = this.getElementVal("name");
    const emailid = this.getElementVal("emailid");
    const msgContent = this.getElementVal("msgContent");

    // Save the form data to Firebase
    this.saveMessages(name, emailid, msgContent);
  },

  // Function to save the input data to Firebase and display a console message based on the result
  saveMessages: function(name, emailid, msgContent) {
    const newContactForm = this.dbRef.push(); // Create a new entry in the database
    newContactForm.set({
      name: name,
      emailId: emailid,
      msgContent: msgContent,
    })
    .then(() => {
      console.log("Message saved successfully"); // Log success message
    })
    .catch((error) => {
      console.error("Error saving message: ", error); // Log error message
    });
  },

  // Utility function to get the value of a form input field by its ID
  getElementVal: function(id) {
    return document.getElementById(id).value;
  }
};

// Add an event listener to initialize the form handler once the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
  contactFormHandler.init();
});
