import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


const MainFeaturedPost =() => {
  const post = {
    title: 'Photo 업무를 함께 DO!',
    description: '서로 어떻게 공유하느냐가 업무 효율을 좌우합니다.\n프로젝트 멤버들에게 일일이 묻고 물어 저 멀리 자료를 찾아 삼만리를 떠나던 과거는 이제 안녕!\nPhoDo는 효율이 중요한 당신을 위한 사진 중심 협업 사이트입니다.',
    image: '/mainImg.jpg',
    imageText: '',
    linkText: 'Project 만들기',
  };

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${post.image})`,
        margin: '30px 40px  20px 40px',
        borderRadius: '20px'
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none'}} src={post.image} alt={post.imageText} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
          margin: '5px'
        }}
      />
      <Grid container>
        <Grid item md={10}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 8 },
              pr: { md: 2 },
            }}
          >
            <Typography variant="h2" color="inherit" gutterBottom sx={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
              {post.title}
            </Typography>
            <Typography variant="h6" color="inherit" paragraph sx={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
            {post.description.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                {line}
                <br />
                </React.Fragment>
            ))}
            </Typography>
            <Button variant="outlined" href="/newproject" sx={{color: 'white', borderColor: 'white', borderRadius: '50px'}}>
            {post.linkText}
            </Button>

          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MainFeaturedPost;