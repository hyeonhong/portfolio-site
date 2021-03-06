import styled from '@emotion/styled'
import { Box, Typography } from '@material-ui/core'

const Circle = styled.div`
  width: 160px;
  height: 160px;
  background: #2ac1bc;
  color: #fff;
  border-radius: 50%;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
`

const Oval = styled.div`
  width: 240px;
  height: 120px;
  background: #556cd6;
  color: #fff;
  border-radius: 120px / 60px;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
`

const CircleText = ({ text }) => (
  <Box>
    <Circle>
      <Typography variant="h6">{text}</Typography>
    </Circle>
  </Box>
)

const OvalText = ({ text }) => (
  <Box>
    <Oval>
      <Typography variant="h6">{text}</Typography>
    </Oval>
  </Box>
)

export { CircleText, OvalText }
