import React, {useState} from 'react';
import RoadmapCardInHome from '#components/RoadmapView/RoadmapCardInHome/RoadmapCardInHome.jsx';
import './RoadmapSearchPage.css';

export default function RoadmapSearchPage({ roadmaps, handleBookmarkToggle }) {
  const [selectedFilter, setSelectedFilter] = useState('Popular');
  
  const onClickFilter = (filter) => {
    setSelectedFilter(filter);
    // TODO: sort/filter data
  };
    // roadmaps: mảng chứa các đối tượng roadmap giống Home
  const allRoadmaps = [
    { id: 1,  name: "React Basics",                    description: "Learn JSX, components, state and props",                           author: "Linh Tran",      learning: 1200,  teaching: 50, isUserCard: false },
    { id: 2,  name: "Advanced React Patterns",         description: "Hooks, Context API, render props, HOCs",                              author: "Hieu Vo",       learning: 9800,  teaching: 89, isUserCard: false },
    { id: 3,  name: "TypeScript Essentials",           description: "Types, interfaces, generics, utility types",                         author: "Khanh Vu",      learning: 7200,  teaching: 34, isUserCard: false },
    { id: 4,  name: "Node.js Backend Development",     description: "Express, middleware, REST APIs, authentication",                    author: "Bao Nguyen",    learning: 9800,  teaching: 67, isUserCard: false },
    { id: 5,  name: "GraphQL with Apollo",             description: "Schema design, resolvers, queries, mutations, subscriptions",        author: "Mai Pham",      learning: 4300,  teaching: 22, isUserCard: false },
    { id: 6,  name: "PostgreSQL Mastery",              description: "Schema design, indexing, transactions, performance tuning",          author: "Dung Cao",      learning: 5400,  teaching: 45, isUserCard: false },
    { id: 7,  name: "Docker for Developers",           description: "Containers, Dockerfiles, Docker Compose, best practices",            author: "Tuan Le",       learning: 3100,  teaching: 18, isUserCard: false },
    { id: 8,  name: "Kubernetes in Production",        description: "Pods, deployments, services, config maps, volumes, Helm charts",      author: "Phuong Hoang",  learning: 2900,  teaching: 12, isUserCard: false },
    { id: 9,  name: "Microservices Architecture",      description: "Service decomposition, communication, data consistency, observability",author: "Quang Bui",     learning: 2500,  teaching: 10, isUserCard: false },
    { id: 10, name: "CI/CD with Jenkins",              description: "Pipelines, agents, Docker integration, notifications",                author: "Lan Pham",      learning: 1800,  teaching: 8,  isUserCard: false },
    { id: 11, name: "AWS Cloud Foundations",           description: "EC2, S3, RDS, VPC, IAM, CloudFormation basics",                      author: "Minh Tran",     learning: 6700,  teaching: 30, isUserCard: false },
    { id: 12, name: "Machine Learning Basics",         description: "Python, scikit-learn, data preprocessing, model evaluation",         author: "Hai Nguyen",    learning: 4100,  teaching: 14, isUserCard: false }
  ];
  return (
    <div className="search-page-container">
      <h1 className="search-page-title">Result Roadmaps</h1>
      <div className="filter-bar">
        <h3>Filter by:</h3>
        <button
            className={selectedFilter==='Popular'?'selected':''}
            onClick={()=>onClickFilter('Popular')}
        >Popular</button>
        <button
            className={selectedFilter==='Newest'?'selected':''}
            onClick={()=>onClickFilter('Newest')}
        >Newest</button>
        <button
            className={selectedFilter==='Oldest'?'selected':''}
            onClick={()=>onClickFilter('Oldest')}
        >Oldest</button>
        </div>
      <div className="search-roadmap-grid">
        {allRoadmaps.map(r => (
          <div key={r.id} className="search-card-wrapper">
            <RoadmapCardInHome
              id={r.id}
              name={r.name}
              description={r.description}
              author={r.author}
              learning={r.learning}
              teaching={r.teaching}
              isUserCard={r.isUserCard}
              onBookmarkToggle={handleBookmarkToggle}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
