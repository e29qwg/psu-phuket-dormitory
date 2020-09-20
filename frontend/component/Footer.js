import React from 'react'

const Footer = () => {
    return (
        <div className="footer-container">
            <img className="psu-phuket-logo" src="icon/psuPhuketLogo.png" alt="psu phuket logo" />
            <div className="footer-contact">
                <pre>{`             Prince of Songkla University, Phuket Campus
80 Moo 1 Vichitsongkram Road., Kathu, Phuket 83120, Thailand
                    Tel: 062-4488584 Fax: 0-7627-6002`}</pre>
            </div>
            <div className="social-container">fb line ig</div>
            <style global jsx>{`
                .footer-container {
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                }
                div.footer-container > img {
                    width:10em;
                    height: 4em;
                }
                .footer-contact {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .footer-contact > pre {
                    font-size: 14px;
                    line-height: 2em;
                }
            `}
            </style>
        </div>
    )
}
export default Footer