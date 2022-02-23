import React from 'react';
import styled from 'styled-components';

const Result = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: ${(props: { isOpen: any }) => (props.isOpen ? 'block' : 'none')};
  z-index: 1000;

  .modal-main {
    position: fixed;
    background: white;
    width: 40%;
    height: 40%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.5rem;
  }

  .btn-div {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    bottom: 0;
    right: 0;
    .modal-btn-right {
      padding: 1.3rem;
      border-radius: 0.3rem;
      outline: none;
      border: none;
      color: #fff;
      background-color: #62bbe4;
      cursor: pointer;
      margin-right: 4rem;
      margin-bottom: 2rem;
    }
  }
`;
interface Icontrol {
  openHost: boolean;
  handleCloseHost: () => void;
}

const ResultModal = ({
  control,
  children,
}: {
  children: any;
  control: Icontrol;
}) => {
  return (
    <Result isOpen={control.openHost}>
      <section className="modal-main">
        <>{children.props.children}</>
        <div className="btn-div">
          <button
            type="submit"
            className="modal-btn-right"
            onClick={control.handleCloseHost}
          >
            Close
          </button>
        </div>
      </section>
    </Result>
  );
};

export default ResultModal;
