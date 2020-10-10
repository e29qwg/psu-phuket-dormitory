import React from 'react'

const Card = ({ item }) => {
    return (
        <div className="Card">
            <div>{item.title}</div>
            <img src={item.img} />
            <p>{item.description}</p>
            <style jsx>{`
                .Card{
                    display: flex;
                    flex-direction: column;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    align-items: center;
                    margin:5px;
                    padding: 15px;
                    border:1px solid white ;
                    width: 300px;
                    height: 500px;
                }
                .Card > p{
                    word-break: break-all;
                }
                .Card > img {
                    width: 90%;
                    height: 80%;
                }
            `}</style>
        </div>
    )
}

export default Card
