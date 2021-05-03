import { useState, useEffect } from 'react';
import { read, insert, update, remove } from '../services/apiService';

const Student = ({ match, history }) => {
    const [id] = useState(match.params.id);
    let firstNameError = 'First name is required!';
    let lastNameError = 'Last name is required!';
    const [student, setStudent] = useState({
        _id: '0',
        firstName: '',
        lastName: '',
        yearOfBirth: 0,
        address: ''
    });

    useEffect(() => {
        if(id !== '0'){
            read('students', id, data => {
                if(data) setStudent(data);
            })
        }
    }, [id]);

    const validate = () => {
        if(student.firstName === '') {
            return false;
        } 
        if (student.lastName === '') {
            return false;
        }
        
        return true;
    }

    function changeHandler(e) {
            setStudent({
                ...student,
                [e.target.name]: e.target.value
            });
    }

    const back = () => {
        history.push('/students');
    }

    const save = () => {
        let isValid = validate();
        if(isValid){
        if(id === '0') {
            insert('students', student, data => {
                if(data) return history.push('/students');
                console.log('There was error during save data');
            })
        } else {
            update('students', id, student, data => {
                if(data) return history.push('/students');
                console.log('There was error during save data'); 
            })
        }
        }
    }

    const del = () => {
        remove('students', id, data =>{
            history.push('/students');
        })
    }

    return(
        <div className='container'>
            <h2>Student</h2>
            <form className='input-from'>
                <div style={{margin: '12px 0'}}>
                    <label htmlFor='firstName'>First name: </label>
                    <input type='text' 
                           name='firstName'
                           value={student.firstName}
                           onChange={changeHandler}/>
                    {student.firstName === '' ? <div 
                        style={{ fontSize: 12, color: "red" }}>
                            {firstNameError}</div> : null }
                </div>
                <div style={{margin: '12px 0'}}>
                    <label htmlFor='lastName'>Last name: </label>
                    <input type='text' 
                           name='lastName'
                           value={student.lastName}
                           onChange={changeHandler}/>
                    {student.lastName === '' ? <div 
                        style={{ fontSize: 12, color: "red" }}>
                            {lastNameError}</div> : null }
                </div>
                <div style={{margin: '12px 0'}}>
                    <label htmlFor='yearOfBirth'>Year of Birth: </label>
                    <input type='text'
                           name='yearOfBirth'
                           value={student.yearOfBirth}
                           onChange={changeHandler} />
                </div>
                <div style={{margin: '12px 0'}}>
                    <label htmlFor='address'>Address: </label>
                    <input type='text'
                           name='address'
                           value={student.address}
                           onChange={changeHandler} />
                </div>
                <hr />
                {id !== '0' && (
                    <div className='left'>
                        <button type='button' onClick={del}>DELETE</button>
                    </div>
                )}
                <div className='right'>
                    <button type='button' onClick={back}>BACK</button>
                    &nbsp;&nbsp;
                    <button type='button' onClick={save}>SAVE</button>
                </div>
            </form>
        </div>
    ) 
}

export default Student;