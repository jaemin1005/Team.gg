class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

/**
 * * 2024.04.22 황재미
 * * 자료구조 Queue 구현
 */
class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
  }

  /**
   * * 비어있는지 확인.
   * @returns 큐가 비어있으면 null 반환
   */
  isEmpty() {
    return this.front == null && this.rear == null;
  }

  /**
   * * Queue 삽입
   * * 큐가 비어있으면 front에 노드 삽입 그리고 rear에도 연결해줌
   * * 큐가 있으면 노드 끝 다음에 지금 노드 끝인 rear.next로 연결
   * * 들어온 노드 끝으로 연결
   * @param {} data 
   */
  enqueue(data) {
    const newNode = new Node(data);
    if (this.isEmpty() == true) {
      this.front = newNode;
    }
    else {
      this.rear.next = newNode;
    }

    this.rear = newNode;
  }

  /**
   * * Queue 노드 꺼내오기
   * * Queue의 앞부분, front 부분을 불러와서 선입선출(FIFO)을 할 수 있게 한다.
   * @returns 
   */
  dequeue() {
    if (this.isEmpty() == true) return null;

    let dequeueNode = this.front;

    // * 현재 다음 노드가 없으면, 노드가 없는 상태이므로 front, rear 부분을 null로 해준다
    if (dequeueNode.next == null) {
      this.front = this.rear = null;
    }
    // * 다음 노드가 있으면 현재 front 부분으로 설정함.
    else {
      this.front = dequeueNode.next;
    }

    // * 꺼내온 노드 연결 삭제
    // * next를 null 만들어 연결을 끊어준다.
    dequeueNode.next = null;
    return dequeueNode.data;
  }

  /**
   * * Peek 현재 제일 앞노드 확인
   * @returns this.front.data
   */
  peek() {
    if (this.isEmpty() == true) return null;

    let peekNode = this.front;
    return peekNode.data;
  }
}

module.exports = Queue;