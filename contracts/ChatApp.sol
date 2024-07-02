//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract ChatApp{
    //USER STRUCT

    struct user{
        string name;
        friend[] friendList;
    }

    struct friend{
        address pubkey;
        string name;
    }

    struct message{
        address sender;
        uint256 timestamp;
        string msg;
    }

    struct AllUserStruck{
        string name;
        address accountAddress;
    }

    AllUserStruck[] getAllUsers;

    mapping(address => user ) userList;
    mapping(bytes32 => message[]) allMessages;

    struct post{
        uint pid;
        address owner;
        string cid;
        string caption;
        uint256 timestamp;
        address[] likes;
        address[] dislikes;
    }

    // struct comment{
    //     address owner;
    //     string comment;
    //     uint256 timestamp;
    // }

    uint postNo = 0;
    mapping(uint => post) allPosts;
    mapping(address => uint[]) userPosts;


    //CHECK USER EXIST

    function checkUserExists ( address pubkey ) public view returns (bool ) {
        return bytes(userList[pubkey].name).length > 0;
    }

    //CREATE ACCOUNT
    function createAccount(string calldata name) external { 
        require(checkUserExists(msg.sender)==false,"User already exists");
        require(bytes(name).length>0 , "Username cannot be empty");
        userList[msg.sender].name = name;
        getAllUsers.push(AllUserStruck(name,msg.sender));
    }

    //GET USERNAME
    function getUsername(address pubkey) external view returns(string memory){
        require(checkUserExists(pubkey)==true,"User is not registered");
        return userList[pubkey].name;
    }

    //ADD FRIEND
    function addFriend(address friend_key,string calldata name) external{
        require(checkUserExists(msg.sender)==true,"Create an account first");
        require(checkUserExists(friend_key)==true,"User is not registered");
        require(msg.sender != friend_key,"You cannot add yourself as a friend");
        require(checkAlreadyFriends(msg.sender,friend_key)==false,"You are already friends");
        _addFriend(msg.sender,friend_key,name);
        _addFriend(friend_key,msg.sender,userList[msg.sender].name);


        // require(bytes(name).length>0 , "Username cannot be empty");
        // userList[msg.sender].friendList.push(friend(friend_key,name));
    }

    //checkAlreadyFriends
    function checkAlreadyFriends(address pubkey1,address pubkey2) internal view returns(bool){
        if(userList[pubkey1].friendList.length> userList[pubkey2].friendList.length){
            address tmp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = tmp;
        }

        for(uint256 i = 0 ;i<userList[pubkey1].friendList.length; i++){
            if(userList[pubkey1].friendList[i].pubkey == pubkey2)return true;
        }

        return false;
    }

    function _addFriend(address me , address friend_key, string memory name ) internal{
        friend memory newFriend = friend(friend_key, name);
        userList[me].friendList.push(newFriend);
    }

    //GETMY FRIEND
    function getMyFriendList() external view returns(friend[] memory){
        require(checkUserExists(msg.sender)==true,"Create an account first");
        return userList[msg.sender].friendList;
    }

    //get Chat code
    function _getChatCode(address pubkey1,address pubkey2) internal pure returns(bytes32){
        if(pubkey1<pubkey2){
            return keccak256(abi.encodePacked(pubkey1,pubkey2));
        }
        return keccak256(abi.encodePacked(pubkey2,pubkey1));
    }

    //SEND MESSAGE 
    function sendMessage(address friend_key, string calldata _msg) external {
        require(checkUserExists(msg.sender)==true,"Create an account first");
        require(checkUserExists(friend_key),"User is not registered");
        require(checkAlreadyFriends(msg.sender,friend_key),"You are not friends with the given user");
        bytes32 chatCode = _getChatCode(msg.sender,friend_key);
        message memory newMsg = message(msg.sender,block.timestamp,_msg);
        allMessages[chatCode].push(newMsg);
    }

    //READ MESSAGE 
    function readMessage(address friend_key) external view returns ( message[] memory){
        bytes32 chatCode = _getChatCode(msg.sender,friend_key);
        return allMessages[chatCode];
    }

    function getAllAppUsers() public view returns(AllUserStruck[] memory){
        return getAllUsers;
    }


    //CREATE POST
    function createPost(string calldata _cid,string calldata _caption) external{
        require(checkUserExists(msg.sender)==true,"Create an account first");
        require(bytes(_cid).length>0,"CID cannot be empty");
        require(bytes(_caption).length>0,"Caption cannot be empty");
        post memory newPost = post(postNo,msg.sender,_cid,_caption,block.timestamp,new address[](0),new address[](0));
        allPosts[postNo] = newPost;
        userPosts[msg.sender].push(postNo);
        postNo++;
    }

    //GET ALL POSTS
    function getAllPosts() external view returns(post[] memory){
        post[] memory posts = new post[](postNo);
        for(uint i = 0 ; i<postNo ; i++){
            if(allPosts[i].dislikes.length*3<getAllUsers.length)
            posts[i] = allPosts[i];
        }
        return posts;
    }

    //GET USER POSTS
    function getUserPosts(address pubkey) external view returns(post[] memory){
        require(checkUserExists(pubkey)==true,"User is not registered");
        uint[] memory userPost = userPosts[pubkey];
        post[] memory posts = new post[](userPost.length);
        for(uint i = 0 ; i<userPost.length ; i++){
            posts[i] = allPosts[userPost[i]];
        }
        return posts;
    }

    //LIKE POST
    function likePost(uint _postNo) external{
        require(checkUserExists(msg.sender)==true,"Create an account first");
        require(_postNo<postNo,"Post does not exist");
        require(checkAlreadyLiked(_postNo,msg.sender)==false,"You have already liked the post");
        allPosts[_postNo].likes.push(msg.sender);
    }

    //UNLIKE POST
    function unlikePost(uint _postNo) external{
        require(checkUserExists(msg.sender)==true,"Create an account first");
        require(_postNo<postNo,"Post does not exist");
        require(checkAlreadyLiked(_postNo,msg.sender)==true,"You have not liked the post");
        address[] memory likes = allPosts[_postNo].likes;
        for(uint i = 0 ; i<likes.length ; i++){
            if(likes[i]==msg.sender){
                delete allPosts[_postNo].likes[i];
                break;
            }
        }
    }

    //DISLIKE POST
    function dislikePost(uint _postNo) external{
        require(checkUserExists(msg.sender)==true,"Create an account first");
        require(_postNo<postNo,"Post does not exist");
        require(checkAlreadyDisliked(_postNo,msg.sender)==false,"You have already disliked the post");
        allPosts[_postNo].dislikes.push(msg.sender);
    }

    //UNDISLIKE POST
    function undislikePost(uint _postNo) external{
        require(checkUserExists(msg.sender)==true,"Create an account first");
        require(_postNo<postNo,"Post does not exist");
        require(checkAlreadyDisliked(_postNo,msg.sender)==true,"You have not disliked the post");
        address[] memory dislikes = allPosts[_postNo].dislikes;
        for(uint i = 0 ; i<dislikes.length ; i++){
            if(dislikes[i]==msg.sender){
                delete allPosts[_postNo].dislikes[i];
                break;
            }
        }
    }

    //CHECK ALREADY LIKED
    function checkAlreadyLiked(uint _postNo,address pubkey) internal view returns(bool){
        address[] memory likes = allPosts[_postNo].likes;
        for(uint i = 0 ; i<likes.length ; i++){
            if(likes[i]==pubkey)return true;
        }
        return false;
    }

    //CHECK ALREADY DISLIKED
    function checkAlreadyDisliked(uint _postNo,address pubkey) internal view returns(bool){
        address[] memory dislikes = allPosts[_postNo].dislikes;
        for(uint i = 0 ; i<dislikes.length ; i++){
            if(dislikes[i]==pubkey)return true;
        }
        return false;
    }

    //COMMENT ON POST
    // function commentOnPost(uint _postNo,string calldata _comment) external{
    //     require(checkUserExists(msg.sender)==true,"Create an account first");
    //     require(_postNo<postNo,"Post does not exist");
    //     require(bytes(_comment).length>0,"Comment cannot be empty");
    //     //giving newComment memory is giving error UnimplementedFeatureError: Copying of type struct ChatApp.comment memory[] memory to storage not yet supported.
    //     comment memory newComment = comment(msg.sender,_comment,block.timestamp);
    //     allPosts[_postNo].comments.push(newComment);
    //     // userPosts[msg.sender].push(_postNo);
    // }

}



