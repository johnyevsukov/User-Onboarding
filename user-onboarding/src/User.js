import React from 'react'

export default function User({details}){
    return(
        <div>
            <h2>{details.name ? details.name : details.first_name}</h2>
            <p>Email: {details.email}</p>
            <p>Password: {details.password ? details.password : 'NA'}</p>
        </div>
    )
}