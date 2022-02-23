import styled from "styled-components"



export const ModalContainer = styled.div`
  margin: 2rem;

  h1 {
    font-size: 2.5rem;
    margin-left: 4rem;
  }

  .modal-form {
      width: 55%;
      margin: 4rem auto;

      p {
          font-size: 1.5rem;
          margin-bottom: 2rem;
      }
    .form-group {
      display: flex;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
      justify-content: space-between;
      align-items: center;

      input {
        display: block;
        font-size: 1.5rem;
        margin-left: 1rem;
        padding: 1rem;
        width: 30rem;

        &:focus {
          /* outline: none;
          box-shadow: 0px 0px 2px #eee; */
        }
      }


  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
      flex-flow: column nowrap;
    }

    }
  }
`;

export const Main = styled.div`
  height: 90vh;
  background-color: #fff;
  margin: 2rem;
  position: relative;

  .Display-inner-container {
    border: 0.1rem solid #e7e7e7;
    margin: 0 auto 2rem auto;
    width: 90%;
    height: 78%;
    position: relative;

    .Display-print {
      display: flex;
      justify-content: flex-end;

      img {
        margin: 0.5rem;
      }

      span {
        margin: 0.5rem 2rem 0.5rem 0.5rem;
        align-self: center;
        font-size: 1.1rem;
      }
    }

    table {
      width: 100%;
      border-collapse: collapse;

      th {
        font-weight: normal;
        background-color: #f3f3f7;
        font-size: 1.2rem;
        text-align: center;
        padding: 0.5rem;
        padding-top: 1.1rem;
        padding-bottom: 1.1rem;
      }

      td {
        font-size: 1.2rem;
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
        text-align: center;
        padding: 0.5rem;
        border-bottom: 1px solid #dddddd;

        .color-span {
          color: #499dff;
        }

        .btn-edit {
          background-color: #62bbe4;
          color: #fff;
          border: none;
          padding: 0.5rem;
          border-radius: 0.4rem;
          outline: none;
          cursor: pointer;

          &:hover {
            background-color: #62bbf7;
          }
        }
      }

      tr {
        &:hover {
          /* background-color: #ddd; */
        }
      }
    }

    .btn-action {
      background-color: #62bbe4;
      color: #fff;
      border: none;
      padding: 0.5rem;
      border-radius: 0.4rem;
      outline: none;
      cursor: pointer;
    }

    .footer {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      color: #000;
      text-align: center;
      padding-top: 2rem;
      padding-bottom: 2rem;
    }
  }

  .filter-row {
    display: flex;
    padding: 3rem;
    justify-content: space-between;
    align-items: center;
    .filter-search-input {
      display: flex;
      padding-left: 4rem;

      .filter-select {
        width: 20rem;
        line-height: 1.3;
        margin-right: 2rem;
      }
    }
  }

    /* .home-filter-row {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin: 2rem;
      padding: 2rem;
    } */
    .pad {
      margin-right: 5rem;
    }

    .pagination-list {
      display: flex;
      justify-content: center;
      align-items: center;

      li {
        list-style: none;

        button {
          padding: 0.3rem;
          border: none;
          background-color: transparent;
          cursor: pointer;
          outline: none;
        }
      }
    }

    @media only screen and (max-width: 760px),
      (min-device-width: 768px) and (max-device-width: 1024px) {
      .filter-row {
        flex-flow: column nowrap;
        justify-content: center;

        .filter-search-input {
          flex-flow: column nowrap;

          .filter-select {
            height: 4rem;
            width: 30rem;
            margin-top: 1rem;
          }
        }
      }

      /* button {
        height: 4rem;
        width: 30rem;
        margin-left: 6rem;
        margin-top: 1rem;
      } */
    

    /* Force table to not be like tables anymore */
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    /* Hide table headers (but not display: none;, for accessibility) */
    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }

    tr {
      margin: 0 0 1rem 0;
    }

    tr:nth-child(odd) {
      background: #ccc;
    }

    td {
      /* Behave  like a "row" */
      border: none;
      border-bottom: 1px solid #eee;
      position: relative;
      padding-left: 50%;
    }

    td:before {
      /* Now like a table header */
      position: absolute;
      /* Top/left values mimic padding */
      top: 0;
      left: 6px;
      width: 45%;
      padding-right: 10px;
      white-space: nowrap;
    }

    /*
		Label the data
    You could also use a data-* attribute and content for this. That way "bloats" the HTML, this way means you need to keep HTML and CSS in sync. Lea Verou has a clever way to handle with text-shadow.
		*/
    td:nth-of-type(1):before {
      content: 'S/N';
    }
    td:nth-of-type(2):before {
      content: 'STATUS';
    }
    td:nth-of-type(3):before {
      content: 'SERVER NAME';
    }
    td:nth-of-type(4):before {
      content: 'IP ADDRESS';
    }
    td:nth-of-type(5):before {
      content: 'CPU(%)';
    }
    td:nth-of-type(6):before {
      content: 'MEMORY(%)';
    }
    td:nth-of-type(7):before {
      content: 'STORAGE(%)';
    }
    td:nth-of-type(8):before {
      content: 'ACTION';
    }
  }
`;

