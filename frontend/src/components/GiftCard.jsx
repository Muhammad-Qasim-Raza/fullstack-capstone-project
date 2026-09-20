import {Link} from "react-router-dom";
export default function GiftCard({gift}){return <article className="card"><span className="badge">{gift.category}</span><h3>{gift.title}</h3><p>{gift.description}</p><p className="muted">{gift.location}</p><Link className="button secondary" to={`/gifts/${gift._id}`}>View Details</Link></article>}
