import React from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    CardHeader
} from '@mui/material';

const Dashboard = () => {
    const stats = [
        { title: 'Total Users', value: 120, color: '#1976d2' },
        { title: 'Active Users', value: 95, color: '#2e7d32' },
        { title: 'New Signups', value: 25, color: '#ed6c02' },
        { title: 'Pending Tasks', value: 8, color: '#d32f2f' },
    ];

    const lastFiveUsers = [
        'Arjun Kumar',
        'Divya Sharma',
        'Ravi Raj',
        'Sneha Iyer',
        'Manoj Das',
    ];

    return (
        <Box p={3}>
            <Typography variant="h4" mb={4}>
                Kamalam Pandi
            </Typography>

            {/* Stats */}
            <Grid container spacing={3} mb={4}>
                {stats.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{ backgroundColor: item.color, color: '#fff' }}>
                            <CardContent>
                                <Typography variant="h6">{item.title}</Typography>
                                <Typography variant="h4">{item.value}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Last 5 Users */}
            <Card>
                <CardHeader title="Last 5 Users" sx={{ backgroundColor: '#f5f5f5' }} />
                <List>
                    {lastFiveUsers.map((user, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={`${index + 1}. ${user}`} />
                        </ListItem>
                    ))}
                </List>
            </Card>
        </Box>
    );
};

export default Dashboard;
