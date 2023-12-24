import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { Box, Container } from '@mui/material';

function DefaultLayout({ children }) {

    return (
        <Box component="main" sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh', 
        }}
        >
            <Header />
            <Container sx={{ py: { xs: 2, md: 3 }, flex: '1' }}>
                {children}
            </Container>
            <Footer />
        </Box>
    );
}

export default DefaultLayout;
