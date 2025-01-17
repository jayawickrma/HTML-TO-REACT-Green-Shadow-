import React from 'react';

const Header: React.FC = () => {
    return (
        <header
            style={{
                width: '86vw',
                background: '#007bff',
                color: 'white',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
        >
            <h1 style={{ margin: 0 }}>Farm Management System</h1>
            <div style={{ display: 'flex', gap: '15px' }}>
                <button
                    style={{
                        background: 'white',
                        color: '#007bff',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '5px 10px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                    onClick={() => alert('Notifications')}
                >
                    Notifications
                </button>
                <button
                    style={{
                        background: 'white',
                        color: '#007bff',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '5px 10px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                    onClick={() => alert('Profile Settings')}
                >
                    Profile
                </button>
            </div>
        </header>
    );
};

export default Header;
