import React from 'react'

const NewsItems =(props) => {

    let {title, description,imageUrl,newsUrl,publishedAt,author,source} = props
        return (
            <div>
             <div className="card mb-3">
             <span  className="position-absolute top-0  translate-middle badge rounded-pill bg-danger " style={{zIndex:"1" , left:"90%"}}>
                 {source}    
                  </span>
                <div className="row g-0">
                    <div className="col-md-4">
                    <img src={imageUrl} className="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text">
                       <small className="text-muted">{new Date(publishedAt).toGMTString()}</small>
                       <br/>
                       </p>
                       <h6 className="text-muted">{author?author:"Unkonwn"}</h6>
                       <a href={newsUrl} target="__blank"> <button type="button" className="btn btn-sm btn-outline-dark">Read More</button></a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
}

export default NewsItems
