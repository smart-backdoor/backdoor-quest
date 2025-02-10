export const titleStyles = {
  fontSize: '3rem',
  marginBottom: 3,
  position: 'relative',
  display: 'inline-block',
  fontWeight: '600',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '0%',
    height: '4px',
    bottom: '-5px',
    left: '0',
    background: 'linear-gradient(90deg, #939deb, #d2a3e7)',
    transition: 'width 0.3s ease-in-out',
  },
  '&:hover::after': {
    width: '100%',
  },
};

export const boxStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: 3,
};

export const quizCardStyles = {
  width: { xs: '100%', sm: '48%', md: '30%' },
  cursor: 'pointer',
};
