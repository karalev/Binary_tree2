'use strict';

class BinaryTree {
	constructor() {
        this.root = null;
	}

	insert(data) {
        var root = this.root;
        //case when there's no root
        if(!root){
            this.root = new Node(data);
            return;
        }

        var currentNode = root;
        var newNode = new Node(data); 
        //if the value is less than the current Node's
        while(currentNode){
            if(data < currentNode.data){
                if(!currentNode.left){
                    currentNode.left = newNode;
                    break;
                }
                else{
                    currentNode = currentNode.left;
                }
            }
            //if the value is greater than the current Node's
            else{
                if(!currentNode.right){
                    currentNode.right = newNode;
                    break;
                }
                else{
                    currentNode = currentNode.right;
                }
            }
        }
	}

	contains(data) {
        var found       = false;
        var current     = this.root

        //make sure there's a Node to search
        while(!found && current){

            //if the value is less than the current Node's, go left
            if (data < current.data){
                current = current.left;

            //if the value is greater than the current Node's, go right
            } else if (data > current.data){
                current = current.right;

            //values are equal
            } else {
                found = true;
            }
        }

        // true if the Node was found
        return found;
	}

	remove(data) {
        var found       = false;
        var parent      = null;
        var current     = this.root;
        var childCount;
        var replacement = new Node(0);
        var replacementParent = new Node(0);
        var replacementMax = new Node(0);

        //make sure there's a Node to search
        while(!found && current){

            //if the value is less than the current Node's, go left
            if (data < current.data){
                parent = current;
                current = current.left;

            //if the value is greater than the current Node's, go right
            } else if (data > current.data){
                parent = current;
                current = current.right;

            //values are equal, found it!
            } else {
                found = true;
            }
        }

        //only proceed if the Node was found(!!!)
        if (found){
            //figure out how many children
            childCount = (current.left !== null ? 1 : 0) + 
                         (current.right !== null ? 1 : 0);

            //special case: the value is at the root
            if (current === this.root){
                switch(childCount){

                    //no children, just erase the root
                    case 0:
                        this.root = null;
                        break;

                    //one child, use one as the root
                    case 1:
                        this.root = (current.right === null ? 
                                      current.left : current.right);
                        break;

                    //two children, little work to do
                    case 2:
                        //new root will be the old root's left child
                        //...maybe
                        replacement = this.root.left;

                        //find the right-most leaf Node to be 
                        //the real new root
                        while (replacement.right !== null){
                            replacementParent = replacement;
                            replacement = replacement.right;
                        }

                        //it's not the first Node on the left
                        if (replacementParent !== null){

                            //remove the new root from it's 
                            //previous position
                            replacementParent.right = replacement.left;

                            //give the new root all of the old 
                            //root's children
                            replacement.right = this.root.right;
                            replacement.left = this.root.left;
                        } else {

                            //just assign the children
                            replacement.right = this.root.right;
                        }

                        //officially assign new root
                        this.root = replacement;
                }        

            //non-root values
            } else {

                switch (childCount){

                    //no children, just remove it from the parent
                    case 0:
                        //if the current value is less than its 
                        //parent's, null out the left pointer
                        if (current.data < parent.data){
                            parent.left = null;

                        //if the current value is greater than its
                        //parent's, null out the right pointer
                        } else {
                            parent.right = null;
                        }
                        break;

                    //one child, just reassign to parent
                    case 1:
                        //if the current value is less than its 
                        //parent's, reset the left pointer
                        if (current.data < parent.data){
                            parent.left = (current.left === null ? 
                                           current.right : current.left);

                        //if the current value is greater than its 
                        //parent's, reset the right pointer
                        } else {
                            parent.right = (current.left === null ? 
                                            current.right : current.left);
                        }
                        break;    

                    //two children, a bit more complicated
                    case 2:
                         //reset pointers for new traversal
                        replacement = current.left;
                        replacementParent.data = current.data;
                        replacementParent.left = current.left;
                        replacementParent.right = current.right;
                        
                        //find the right-most Node
                        while(replacement.right !== null){
                            replacementMax = replacement;
                            replacement = replacement.right;
                        }

                        replacementMax = replacementParent.right;

                        //assign children to the replacement
                        replacement.right = replacementMax;
                        //replacement.left = current.left;

                        //place the replacement in the right spot
                        if (current.data < parent.data){
                            parent.left = replacement;
                        } else {
                            parent.right = replacement;
                        }          

                }

            }
        }
	}
    
    traverse(process){
        function inOrder(Node){
            if (Node){

                //traverse the left subtree
                if (Node.left !== null){
                    inOrder(Node.left);
                }            

                //call the process method on this Node
                process.call(this, Node);

                //traverse the right subtree
                if (Node.right !== null){
                    inOrder(Node.right);
                }
            }
        }

        //start with the root
        inOrder(this._root);
    }

	size() {
        var length = 0;
        function inOrder(Node){
            if (Node){

                //traverse the left subtree
                if (Node.left !== null){
                    inOrder(Node.left);
                }            

                length++;

                //traverse the right subtree
                if (Node.right !== null){
                    inOrder(Node.right);
                }
            }
        }

        //start with the root
        inOrder(this.root);
       
        return length;
	}

	isEmpty() {
        var empty = true;
        var root = this.root;
        
        if(root){
            empty = false;
        }
        return empty;
	}
}
