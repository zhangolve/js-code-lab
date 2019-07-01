// 20190701  单向链表，这个时候也许可以使用数据结构，set。
const removeDuplicates = (head) => {
    let current = head;
    let numList = {};
    numList[current.val] = 1;
    while (current != null && current.next != null) {
      if (numList[current.next.val]) {
        current.next = current.next.next;
      } else {
        current = current.next;
        numList[current.val] = 1;
      }
    }
    return head;
  };

  // current 代表的是当前节点。

  // 现在应该看怎么remove掉哪些无用节点。

  // 其实就是做一个跳过操作。