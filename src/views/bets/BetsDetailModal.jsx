import React from "react";
import "./betsDetailModal.scss";
import sampleTransactionQr from "../../assets/sample-transaction-qr.png";
import { FormatFullDate, FormatAmount } from "../../helper/Helpers";
import { getGameLogo } from "../../helper/logos";

const BetsDetailModal = ({
  open,
  onClose,
  combination,
  width,
  gameName,
  subTypeName,
  transactionId,
  gameTime,
  date,
}) => {
  const userData = {
    firstName: "Full",
    lastName: "Name",
    userId: "#UserId",
    mobileNumber: "Mobile Number",
    email: "email@email.com",
  };

  const transactionData = [
    { id: 1, combination: "3-4-4-H-S-H", amount: 10.0, isWinning: false },
    { id: 2, combination: "3-4-4-H-S-H", amount: 10.0, isWinning: true },
    { id: 3, combination: "3-4-4-H-S-H", amount: 10.0, isWinning: false },
  ];

  const calculateTotal = (data) => {
    return data.reduce((total, item) => total + item.amount, 0);
  };

  return (
    <>
      {open && (
        <div className="bet-modal-container" onClick={onClose}>
          <div
            className="custom-dialog"
            style={{ width: width }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="left-section">
              <div>{getGameLogo(gameName, subTypeName, 100)}</div>
              <div className="transaction">
                <img
                  src={sampleTransactionQr}
                  alt={"sample-transaction-qr"}
                  width={70}
                />
                <div>{transactionId}</div>
              </div>
            </div>
            <div className="modal-container">
              <div className="dialog-content">
                <div className="dialog-info-container">
                  <div className="user-info">
                    <div className="user-full-name">
                      {userData.firstName} {userData.lastName}
                    </div>
                    <div>{userData.userId}</div>
                    <div>{userData.mobileNumber}</div>
                    <div>{userData.email}</div>
                  </div>
                  <div className="date-time-container">
                    <div className="time-container">{gameTime}</div>
                    <div>{FormatFullDate(new Date(date))}</div>
                  </div>
                </div>
                <div className="combination-result">{combination}</div>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Combination</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactionData.map((data) => (
                        <tr
                          key={data.id}
                          className={data.isWinning ? "row-win" : ""}
                        >
                          <td>{data.id}</td>
                          <td>{data.combination}</td>
                          <td>{FormatAmount(data.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="total">
                    Total{" "}
                    <span>{FormatAmount(calculateTotal(transactionData))}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BetsDetailModal;
