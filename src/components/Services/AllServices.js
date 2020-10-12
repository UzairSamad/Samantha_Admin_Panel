import React, { Component, useState, useEffect } from 'react';
import firebase from 'firebase'
import firebaseconfig from '../../database'
import { Card } from '../../reusable'

const AllServices = (props) => {

    const [ArrayData, setArrayData] = useState([])
    useEffect(function effectFunction() {

        firebase.database().ref('Services').on('value', snapshot => {
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
                                    <Card
                                        activekey={data}
                                        data={ArrayData[data]}
                                    />
                                ))

                            ) : (<div style={{flex:1,display:'flex',justifyContent:'center',alignItems:'center',marginTop:'5-%'}}>
                                <h2 className="text-center">No Services Available
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

export default AllServices;