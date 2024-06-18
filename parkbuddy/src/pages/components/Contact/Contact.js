import React from 'react';
import './Contact.css';
//import background from '../../../Assets/background.jpg';

const Contact = () => {
    return(
        <div className="contact">
            <div className="contact-container">
            <h1>Contact Us</h1>
            <p>If you have any inquiries, feel free to reach us out!</p>
            <form>
                <label>
                    Name:
                    <input type="text" name="name"/>
                </label>
                <label>
                    Email:
                    <input type="email" name="email"/>
                </label>
                <label>
                    Message:
                    <textarea name="message"/>
                </label>

                <label>
                    <button type = "submit">Submit</button>
                </label>
            </form>
            </div>
        </div>
    );
};

export default Contact;