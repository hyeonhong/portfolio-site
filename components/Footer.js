import Link from 'next/link'
import { useRouter } from 'next/router'
import { makeStyles, experimentalStyled } from '@material-ui/core/styles'
import { useMediaQuery, Typography, Container, Box, Paper, Button } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles((theme) => ({
  link: {
    // Remove all styling of 'a' tag
    color: 'inherit',
    textDecoration: 'inherit'
  },
  footer: {
    color: '#f8f9fa',
    backgroundColor: '#242626'
  },
  verticalBar: {
    display: 'inline-block',
    borderWidth: '0 0 0 3px',
    borderStyle: 'solid',
    borderColor: theme.palette.primary.main,
    height: theme.typography.body1.fontSize,
    marginRight: theme.spacing(1)
  },
  footerText: {
    color: '#f8f9fa'
  }
}))

const StyledPaper = experimentalStyled(Paper)(({ theme }) => ({
  '@media (max-width: 599px)': {
    width: 280
  },
  '@media (min-width: 600px)': {
    width: 360
  },

  padding: theme.spacing(4)
}))

export default function Footer({ texts }) {
  const router = useRouter()
  const classes = useStyles()

  const isMobile = useMediaQuery('(max-width:600px)')

  const Title = ({ name }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
      <div className={classes.verticalBar} />
      <Typography variant="body1" display="inline">
        {name}
      </Typography>
    </Box>
  )

  const InlineLink = ({ text, to }) => (
    <Link href={to}>
      <a className={classes.link}>
        <Typography variant="body1" display="inline" className={classes.footerText}>
          {text}
        </Typography>
      </a>
    </Link>
  )

  const divider = (
    <Typography variant="body1" display="inline" sx={{ whiteSpace: 'pre' }}>
      {isMobile ? '\n' : '    |    '}
    </Typography>
  )

  const SocialMediaLink = ({ href, ...imageProps }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes.link}>
      <img {...imageProps} />
    </a>
  )

  return (
    <footer className={classes.footer}>
      <Container>
        <Box sx={{ marginBottom: 8 }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            ...(isMobile && {
              marginTop: -1,
              '& > *': {
                marginTop: 1
              }
            })
          }}
        >
          <StyledPaper>
            <Title name={texts.name} />
            <Typography
              variant="body2"
              sx={{
                whiteSpace: 'pre',
                ...(isMobile && { whiteSpace: 'normal', wordBreak: 'break-all' })
              }}
            >
              {texts.address}
            </Typography>
            <Box sx={{ marginBottom: 4 }} />
            <Typography variant="body2">{texts.phoneNo}</Typography>
            <Typography variant="body2">{texts.email}</Typography>
          </StyledPaper>
          <StyledPaper>
            <Title name={texts.businessHoursTitle} />
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
              {texts.businessHoursContent}
            </Typography>
          </StyledPaper>
          <StyledPaper>
            <Title name={texts.directions} />
            <Box sx={{ marginBottom: 4 }} />
            <Button
              onClick={() => router.push('/directions')}
              startIcon={<FontAwesomeIcon icon={faArrowCircleRight} />}
            >
              {texts.learnMore}
            </Button>
          </StyledPaper>
        </Box>
        <Box sx={{ marginBottom: 10 }} />
        <Box
          sx={{
            '& > *': {
              marginRight: 2
            },
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <SocialMediaLink
            src="/assets/facebook-color.png"
            alt="facebook"
            width={38}
            height={38}
            href="https://www.facebook.com/drkang4u1/"
          />
          <SocialMediaLink
            src="/assets/instagram.svg"
            alt="instagram"
            width={38}
            height={38}
            href="https://www.instagram.com/mybeauty2010/"
          />
          <SocialMediaLink
            src="/assets/kakaotalk-channel.png"
            alt="instagram"
            width={38}
            height={38}
            href="https://pf.kakao.com/_BtrSj"
          />
          <SocialMediaLink
            src="/assets/youtube.png"
            alt="instagram"
            width={38}
            height={26.82}
            href="https://www.youtube.com/channel/UCAdyfbbDu3SlLN4dR4fuZdQ"
          />
        </Box>

        <Box sx={{ marginBottom: isMobile ? 6 : 2 }} />
        <Box>
          <InlineLink text={texts.terms} to="/terms" />
          {divider}
          <InlineLink text={texts.privacy} to="/privacy" />
          {divider}
          <Typography variant="body1" display="inline">
            {texts.CEO}
          </Typography>
          {divider}
          <Typography variant="body1" display="inline">
            {texts.bizNo}
          </Typography>
        </Box>
        <Box sx={{ marginBottom: 2 }} />
        <Typography variant="body1">
          {`Copyright © ${new Date().getFullYear()} DrKangClinic. All Rights Reserved`}
        </Typography>
        <Box sx={{ marginBottom: 4 }} />
      </Container>
    </footer>
  )
}
