import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';

export default function Student() {

    const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
    const [name, setName] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [students, setStudents] = React.useState([]);

    const handleClickAdd = (e) => {
        e.preventDefault();
        const newStudent = { name, address };
        fetch('http://localhost:8080/student/add', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newStudent)
        }).then(() => {
            console.log(newStudent, "added");
        }
        );
    }

    // Function To Retrieve Data From the database 
    React.useEffect(() => {
        fetch("http://localhost:8080/student/allstudents")
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((result) => {
                setStudents(result);
                console.log(result);
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }, []);
    

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: 'inherit' }}>Add A Student</h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField label="Student Name" variant="outlined" fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField label="Student Address" variant="outlined" fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleClickAdd}>Add Student</Button>
                </Box>
            </Paper>

            <Paper elevation={3} style={paperStyle}>
                <h1>Students</h1>
                {students.map(student => (
                    <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={student.id}>
                        Id: {student.id}<br/>
                        Name: {student.name}<br/>
                        Address: {student.address}<br/>
                    </Paper>
                ))}
            </Paper>
        </Container>

    );
}
