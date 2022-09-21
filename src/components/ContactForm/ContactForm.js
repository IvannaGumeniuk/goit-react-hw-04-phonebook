import { useState } from "react";
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import styles from "./ContactForm.module.css";

export default function ContactForm({onSubmit, checkNewContact}) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = event => {
        const { name, value } = event.target;
        switch (name) {
            case "name":
                setName(value);
                break;
            
            case "number":
                setNumber(value);
                break;
            
            default:
                return;
        }
    };

    const onSubmitForm = (e) => {
        e.preventDefault();

        const newContact = {name, number, id: String(nanoid(5)),};
            if (checkNewContact(newContact)) {
                return;
            }
        onSubmit(newContact);
        setName('');
        setNumber('');
    };

        return (
                <form className={styles.form} onSubmit={onSubmitForm}>
                    <label className={styles.name}> Name   
                        <input className={styles.input}
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            required
                        />
                    </label>
                    <br></br>
                    <label className={styles.name}> Number  
                        <input className={styles.input}
                            type="tel"
                            name="number"
                            value={number}
                            onChange={handleChange}
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                            required
                        />         
                    </label>
                <br></br>
                <button type="submit"> Add contact </button>
                </form>
        )
    }

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    checkNewContact: PropTypes.func.isRequired,
}