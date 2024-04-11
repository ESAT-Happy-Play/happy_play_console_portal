import React, { useEffect, useState } from "react";
import "./betsDetailModal.scss";
import sampleTransactionQr from "../../assets/sample-transaction-qr.png";
import { FormatFullDate, FormatAmount } from "../../helper/Helpers";
import { getGameLogo } from "../../helper/logos";
import { GameService } from "../../services";

const BetsDetailModal = ({
  open,
  onClose,
  combination,
  width,
  gameName,
  subTypeName,
  gameTime,
  date,
  data
}) => {
  const [betData, setBetData] = useState({});
  const [transactionData, setTransactionData] = useState([]);

  const getBetTransaction = (betTransactionId) => {
    console.log(data);
    GameService.getBetTransactionById(betTransactionId).then((res) => {
      if (!!res) {
        const result = res.data;
        const betData = {
          fullName: result.fullName,
          userId: result.userId,
          mobileNumber: result.mobileNumber,
          email: result.email,
          transactionNumber: data.transactionNumber
        }

        console.log(res.data);

        setBetData(betData);
        setTransactionData(result.betItems);
      }
    });
  }

  useEffect(() => {
    if (!!data) {
      getBetTransaction(data.betTransactionId);
    }
  }, [data]);

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
                <div>{betData.transactionNumber}</div>
              </div>
            </div>
            <div className="modal-container">
              <div className="dialog-content">
                <div className="dialog-info-container">
                  <div className="user-info">
                    <div className="user-full-name">
                      {betData.fullName}
                    </div>
                    <div>{betData.userId}</div>
                    <div>{betData.mobileNumber}</div>
                    <div>{betData.email}</div>
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
