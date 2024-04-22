class Node {
  constructor(data)
  {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor()
  {
    this.front = null;
    this.rear = null;
  }

  isEmpty()
  {
    return this.front == null && this.rear == null;
  }

  enqueue(data)
  {
    const newNode = new Node(data);
    if(this.isEmpty() ==  true)
    {
      this.front = newNode;
    }
    else
    {
      this.rear.next = newNode;
    }

    this.rear = newNode;
  }

  dequeue()
  {
    if(this.isEmpty() == true) return null;
    
    let dequeueNode = this.front;

    if(dequeueNode.next == null)
    {
      this.front = this.rear = null;
    }
    else
    {
      this.front = dequeueNode.next;
    }

    return dequeueNode.data; 
  }

  peek()
  {
    if(this.isEmpty() == true) return null;

    let peekNode = this.front;
    return peekNode.data;
  }
}

module.exports = Queue;