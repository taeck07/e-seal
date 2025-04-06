import styled, { keyframes } from 'styled-components';

const mulShdSpin = keyframes`
   0%, 100% {
    box-shadow: 0em -2.6em 0em 0em #333333,
                1.8em -1.8em 0 0em rgba(51,51,51, 0.2),
                2.5em 0em 0 0em rgba(51,51,51, 0.2),
                1.75em 1.75em 0 0em rgba(51,51,51, 0.2),
                0em 2.5em 0 0em rgba(51,51,51, 0.2),
                -1.8em 1.8em 0 0em rgba(51,51,51, 0.2),
                -2.6em 0em 0 0em rgba(51,51,51, 0.5),
                -1.8em -1.8em 0 0em rgba(51,51,51, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(51,51,51, 0.7),
                1.8em -1.8em 0 0em #333333,
                2.5em 0em 0 0em rgba(51,51,51, 0.2),
                1.75em 1.75em 0 0em rgba(51,51,51, 0.2),
                0em 2.5em 0 0em rgba(51,51,51, 0.2),
                -1.8em 1.8em 0 0em rgba(51,51,51, 0.2),
                -2.6em 0em 0 0em rgba(51,51,51, 0.2),
                -1.8em -1.8em 0 0em rgba(51,51,51, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(51,51,51, 0.5),
                1.8em -1.8em 0 0em rgba(51,51,51, 0.7),
                2.5em 0em 0 0em #333333,
                1.75em 1.75em 0 0em rgba(51,51,51, 0.2),
                0em 2.5em 0 0em rgba(51,51,51, 0.2),
                -1.8em 1.8em 0 0em rgba(51,51,51, 0.2),
                -2.6em 0em 0 0em rgba(51,51,51, 0.2),
                -1.8em -1.8em 0 0em rgba(51,51,51, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(51,51,51, 0.2),
                1.8em -1.8em 0 0em rgba(51,51,51, 0.5),
                2.5em 0em 0 0em rgba(51,51,51, 0.7),
                1.75em 1.75em 0 0em #333333,
                0em 2.5em 0 0em rgba(51,51,51, 0.2),
                -1.8em 1.8em 0 0em rgba(51,51,51, 0.2),
                -2.6em 0em 0 0em rgba(51,51,51, 0.2),
                -1.8em -1.8em 0 0em rgba(51,51,51, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(51,51,51, 0.2),
                1.8em -1.8em 0 0em rgba(51,51,51, 0.2),
                2.5em 0em 0 0em rgba(51,51,51, 0.5),
                1.75em 1.75em 0 0em rgba(51,51,51, 0.7),
                0em 2.5em 0 0em #333333,
                -1.8em 1.8em 0 0em rgba(51,51,51, 0.2),
                -2.6em 0em 0 0em rgba(51,51,51, 0.2),
                -1.8em -1.8em 0 0em rgba(51,51,51, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(51,51,51, 0.2),
                1.8em -1.8em 0 0em rgba(51,51,51, 0.2),
                2.5em 0em 0 0em rgba(51,51,51, 0.2),
                1.75em 1.75em 0 0em rgba(51,51,51, 0.5),
                0em 2.5em 0 0em rgba(51,51,51, 0.7),
                -1.8em 1.8em 0 0em #333333,
                -2.6em 0em 0 0em rgba(51,51,51, 0.2),
                -1.8em -1.8em 0 0em rgba(51,51,51, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(51,51,51, 0.2),
                1.8em -1.8em 0 0em rgba(51,51,51, 0.2),
                2.5em 0em 0 0em rgba(51,51,51, 0.2),
                1.75em 1.75em 0 0em rgba(51,51,51, 0.2),
                0em 2.5em 0 0em rgba(51,51,51, 0.5),
                -1.8em 1.8em 0 0em rgba(51,51,51, 0.7),
                -2.6em 0em 0 0em #333333,
                -1.8em -1.8em 0 0em rgba(51,51,51, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(51,51,51, 0.2),
                1.8em -1.8em 0 0em rgba(51,51,51, 0.2),
                2.5em 0em 0 0em rgba(51,51,51, 0.2),
                1.75em 1.75em 0 0em rgba(51,51,51, 0.2),
                0em 2.5em 0 0em rgba(51,51,51, 0.2),
                -1.8em 1.8em 0 0em rgba(51,51,51, 0.5),
                -2.6em 0em 0 0em rgba(51,51,51, 0.7),
                -1.8em -1.8em 0 0em #333333;
  }
`;

const StyledLoader = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 3em;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    font-size: 10px;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    text-indent: -9999em;
    animation: ${mulShdSpin} 1.1s infinite ease;
    transform: translateZ(0);
  }
`;

const Loader = () => {

  return <StyledLoader><div></div></StyledLoader>;
};

export default Loader;
