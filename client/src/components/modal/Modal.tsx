import React from "react";
import styled from "styled-components"



export const ModalStyle = styled.div`
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
    width: 60%;
    height: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.5rem;
  }

  .btn-div {
    display: flex;
    justify-content: flex-end;
    .modal-btn-right {
      padding: 1.3rem;
      border-radius: 0.3rem;
      outline: none;
      border: none;
      color: #fff;
      background-color: #62bbe4;
      cursor: pointer;
      margin-right: 8rem;
    }

    .modal-btn-left {
      padding: 1.3rem;
      border-radius: 0.3rem;
      outline: none;
      border: none;
      color: #000;
      background-color: #fff;
      cursor: pointer;
    }
  }

  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    .modal-main {
      width: 80%;
      height: 80%;
      top: 50%;
      left: 50%;
    }
  }
`;

interface Icontrol {
  modalOpen?: boolean;
  handleClose?: any;
  handleOpen?: any;
}




const Modal = ({ control, children, label, update, submit }: { control: Icontrol; children?: any; label: string; update?: any; submit?: any}) => {



  return (
    <ModalStyle isOpen={control.modalOpen}>
      <section className="modal-main">
        <form
          onSubmit={
            label === 'Create' || label === 'Check Health Status'
              ? submit
              : update
          }
        >
          <>{children.props.children}</>
          <div className="btn-div">
            <button
              type="reset"
              onClick={control.handleClose}
              className="modal-btn-left"
            >
              Cancel
            </button>
            <button type="submit" className="modal-btn-right">
              {label}
            </button>
          </div>
        </form>
      </section>
    </ModalStyle>
  );
};

export default Modal;
