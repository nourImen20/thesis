import React,{ useState, useEffect } from 'react';
import contract from "../../contracts/newscontract.json";
// Importing from the main entry point
import { ethers } from "ethers";
import { Container, Row, Col } from 'react-bootstrap';
import pic from '../../assets/pic.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './article.scss';
import Like from './Actions/Like';
import Comment from './Actions/Comment';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import articles from '../toparticles/articlesData'; // Assuming you have your articles data in a file


const contractAddress = "0x35bE16B6805BE2577903872b6641143B8B709EF6";
const abi = [
	
    {
      "type": "event",
      "name": "AllArticlesFetched",
      "inputs": [
        {
          "type": "tuple[]",
          "name": "articles",
          "components": [
            {
              "type": "uint256",
              "name": "id",
              "internalType": "uint256"
            },
            {
              "type": "string",
              "name": "title",
              "internalType": "string"
            },
            {
              "type": "string",
              "name": "description",
              "internalType": "string"
            },
            {
              "type": "string",
              "name": "articleType",
              "internalType": "string"
            },
            {
              "type": "string",
              "name": "ipfsHash",
              "internalType": "string"
            },
            {
              "type": "address",
              "name": "journalist",
              "internalType": "address"
            }
          ],
          "indexed": false,
          "internalType": "struct Newscontract.ArticleSummary[]"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ArticlePublished",
      "inputs": [
        {
          "type": "uint256",
          "name": "id",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "type": "string",
          "name": "title",
          "indexed": false,
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "description",
          "indexed": false,
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "articleType",
          "indexed": false,
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "ipfsHash",
          "indexed": false,
          "internalType": "string"
        },
        {
          "type": "address",
          "name": "journalist",
          "indexed": false,
          "internalType": "address"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "function",
      "name": "addArticle",
      "inputs": [
        {
          "type": "string",
          "name": "_title",
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "_description",
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "_articleType",
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "_content",
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "_ipfsHash",
          "internalType": "string"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "articleCount",
      "inputs": [],
      "outputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "articles",
      "inputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "type": "uint256",
          "name": "id",
          "internalType": "uint256"
        },
        {
          "type": "string",
          "name": "title",
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "description",
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "articleType",
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "content",
          "internalType": "string"
        },
        {
          "type": "address",
          "name": "journalist",
          "internalType": "address"
        },
        {
          "type": "string",
          "name": "ipfsHash",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getAllArticles",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "getArticle",
      "inputs": [
        {
          "type": "uint256",
          "name": "_id",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        },
        {
          "type": "string",
          "name": "",
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "",
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "",
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "",
          "internalType": "string"
        },
        {
          "type": "address",
          "name": "",
          "internalType": "address"
        },
        {
          "type": "string",
          "name": "",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    }
  ];

  
const Article = () => {


  
  const { id } = useParams(); // Get article ID from URL params
  const article = articles.find(article => article.id === parseInt(id)); // Find article by ID

  if (!article) {
    return <div>Article not found</div>; // Handle case where article is not found
  }

  const articleDate = article.date ? moment(article.date, "DD-MM-YYYY") : moment();

  return (
    <div className='ARTICLE'>
      <Container>
        <figure className='position-relative'>
          <h1 className='title mb-3'>{article.title}</h1>
          <h7 className='subtitle mt-2'>{article.caption}</h7>
          <Row className='d-flex flex-row align-items-center mt-3'>
            <Col xs={1}>
              <img className='object-fit-fill rounded-full author-img' src={pic} alt='Author' />
            </Col>
            <Col xs={4}>
              <h4 className='author'>{article.author}</h4>
            </Col>
            <Col xs={7}>
              <h4 className='author'>{articleDate.format("DD MMM YYYY")}</h4>
            </Col>
          </Row>
          <div className='line'></div>
          <Row className='d-flex flex-row align-items-center justify-content-between'>
            <Col xs={5}>
              <h4 className='author d-inline'>Type of article: </h4> 
              <h4 className='Type d-inline'>{article.type}</h4>
            </Col> 
            <Col xs={3} className='d-flex align-items-center justify-content-between'>
              <Like />
              <Comment />
            </Col>
          </Row>

          <div className='line'></div>
          <img src={pic} alt='pic' className='img-fluid my-2' />
          <figcaption>
            <p className='par'>{article.picap}</p>

            <div style={{ marginTop: '3rem', marginBottom:'3rem' }} >{article.content}</div>
          
          </figcaption>
        </figure>
      </Container>
    </div>
  );
};

export default Article;
