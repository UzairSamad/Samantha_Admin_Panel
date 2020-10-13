import React, { Component, useState, useEffect } from 'react';
import firebase from 'firebase'
import firebaseconfig from '../../database'
import { PortfolioCard } from '../../reusable'

const AllPortfolio = (props) => {

    const [ArrayData, setArrayData] = useState([])
    useEffect(function effectFunction() {

        firebase.database().ref('Portfolio').on('value', snapshot => {
            let data = snapshot.val() ? snapshot.val() : {};
            let HistoryItems = { ...data };
            setArrayData(HistoryItems)
        })

    }, []);

    const availableKeys = Object.keys(ArrayData)

    return (

        <>
            <div className="container-fluid mb-5">
                <div className="row">
                    <div className="col-10 mx-auto">
                        <div className="row">
                            {availableKeys.length > 0 ? (
                                availableKeys.map(data => (
                                    <PortfolioCard
                                        activekey={data}
                                        data={ArrayData[data]}
                                    />
                                ))

                            ) : (<div style={{flex:1,display:'flex',justifyContent:'center',alignItems:'center',marginTop:'20%'}}>
                                <h2 className="text-center"><strong> No Portfolio Available</strong>
                                    </h2>
                            </div>
                                )}

                        </div>
                    </div>
                </div>
            </div>
        </>






    )
}

export default AllPortfolio;