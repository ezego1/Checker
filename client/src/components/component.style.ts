import styled from "styled-components"

export const Nav = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  padding-left: 5rem;
  padding-right: 5rem;
  height: 7vh;
  background-color: #fff;
  align-items: center;
  position: relative;

  .button-div {
    justify-self: end;
    margin-right: 1rem;

    button {
      padding: 1rem;
      border-radius: 0.3rem;
      border: none;
      outline: none;
      color: #fff;
      background-color: #62bbe4;
      cursor: pointer;
      &:hover {
        background-color: #62bbf7;
      }
    }
  }

  @media (max-width: 768px) {
    justify-items: end;
    grid-template-columns: none;
    padding: 0;
  }
`;

export const InputStyle = styled.div`
  display: flex;
  align-items: center;
  background-color: #f3f3f7;
  height: 4rem;
  width: 30rem;
  margin-right: 2rem;
  padding-top: 0.5rem;
  border-radius: 0.5rem;

  .search-icon {
    font-size: 1.2rem;
    background-color: transparent;
    outline: none;
    width: 3rem;
    color: #8b9091;
  }

  .search-input {
    outline: none;
    border: none;
    padding: 0.5rem;
    background-color: transparent;
    color: #000;
    width: 25rem;
  }
`;

export const ButtonStyle = styled.div`
  margin-right: 4rem;

  .btn {
    padding: 1.5rem;
    border-radius: 0.5rem;
    outline: none;
    border: none;
    color: #fff;
    background-color: #62bbe4;
    cursor: pointer;

    &:hover {
      background-color: #62bbf7;
    }
  }

  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    .btn {
      height: 4rem;
      width: 30rem;
      margin-left: 6rem;
      margin-top: 1rem;
    }
  }
`;

export const LogoStyle = styled.div`
  height: 7vh;
  background-color: #1b1464;
  color: #fff;
  display: flex;
  align-items: center;
  padding-left: 3rem;

  img {
    font-size: 0.5rem;
  }
`;

