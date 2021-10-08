pragma solidity >=0.4.24 <0.9.0; //declarando la version de compatibilidad del compilador

contract Voting{
    
    struct Candidate{
        uint id;
        string name;
        uint voteCount;
    }
    
    mapping (uint => Candidate) public candidates;
    uint public candidatecount;
    mapping (address => bool) public citizen;
    
    constructor() {
        addCandidate("Bidden");
        addCandidate("Trump");
    }
    
    function addCandidate(string memory _name) private{
        candidatecount++;
        candidates[candidatecount] = Candidate(candidatecount, _name, 0);
    }
    
    function vote(uint _candidateid) public{
        require(!citizen[msg.sender]);
        citizen[msg.sender] = true;
        candidates[_candidateid].voteCount ++;
    }

    function getResult(uint _candidateid)public view returns(uint){
        return candidates[_candidateid].voteCount;
    }
}