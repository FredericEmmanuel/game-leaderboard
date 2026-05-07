// game-leaderboard/back-end/avlTree.js

class Node {
    constructor(username, score) {
        this.username = username;
        this.score = score;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    getHeight(node) {
        return node ? node.height : 0;
    }

    getBalanceFactor(node) {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    rightRotate(y) {
        let x = y.left;
        let T2 = x.right;
        x.right = y;
        y.left = T2;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        return x;
    }

    leftRotate(x) {
        let y = x.right;
        let T2 = y.left;
        y.left = x;
        x.right = T2;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        return y;
    }

    insert(node, username, score) {
        if (!node) return new Node(username, score);

        if (score < node.score) {
            node.left = this.insert(node.left, username, score);
        } else {
            node.right = this.insert(node.right, username, score);
        }

        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
        let balance = this.getBalanceFactor(node);

        if (balance > 1 && score < node.left.score) return this.rightRotate(node);
        if (balance < -1 && score >= node.right.score) return this.leftRotate(node);
        if (balance > 1 && score >= node.left.score) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }
        if (balance < -1 && score < node.right.score) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }
        return node;
    }

    minValueNode(node) {
        let current = node;
        while (current.left !== null) current = current.left;
        return current;
    }

    deleteByUsername(node, username) {
        if (!node) return null;

        node.left = this.deleteByUsername(node.left, username);
        node.right = this.deleteByUsername(node.right, username);

        if (node.username === username) {
            if (!node.left || !node.right) {
                node = node.left || node.right;
            } else {
                let temp = this.minValueNode(node.right);
                node.username = temp.username;
                node.score = temp.score;
                node.right = this.deleteByUsername(node.right, temp.username);
            }
        }

        if (!node) return null;

        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
        let balance = this.getBalanceFactor(node);

        if (balance > 1 && this.getBalanceFactor(node.left) >= 0) return this.rightRotate(node);
        if (balance > 1 && this.getBalanceFactor(node.left) < 0) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }
        if (balance < -1 && this.getBalanceFactor(node.right) <= 0) return this.leftRotate(node);
        if (balance < -1 && this.getBalanceFactor(node.right) > 0) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }

        return node;
    }

    getInOrder(node, result = []) {
        if (node) {
            this.getInOrder(node.right, result);
            result.push({ username: node.username, score: node.score });
            this.getInOrder(node.left, result);
        }
        return result;
    }
}

module.exports = AVLTree;