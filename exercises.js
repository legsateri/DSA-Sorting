const List = require('../DSA-LinkedList/LinkedList.js')

// Understanding merge sort
// [21, 1]
// [16, 49, 39, 27, 43, 34, 46, 40]
// [1], [21]
// [1, 21, 26, 45], [2, 9, 28, 29]



// Understanding quicksort
// The pivot could have been 14 or 17, in both cases the values to left and right are appropriately divided
// Last item: [10, 3, 9, 12, 19, 14, 17, 16, 13, 15]
// First item: [12, 9, 3, 10, 13, 14, 17, 15, 19, 16]



// Implementing quicksort
// let arr = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 
//     13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 
//     15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 
//     23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 
//     64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 
//     80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 
//     78, 40, 14, 5]

let arr = ['test', 'one', 'Alex']

function qSort(array, start = 0, end = array.length) {
    if (start >= end) {
        return array;
    }
    const middle = partition(array, start, end);
    array = qSort(array, start, middle);
    array = qSort(array, middle + 1, end);
    return array;
};

function partition(array, start, end) {
    const pivot = array[end - 1];
    let j = start;
    for (let i = start; i < end - 1; i++) {
        if (array[i] <= pivot) {
            swap(array, i, j);
            j++;
        }
    }
    swap(array, end - 1, j);
    return j;
};

function swap(array, leftIndex, rightIndex) {
    var temp = array[leftIndex];
    array[leftIndex] = array[rightIndex];
    array[rightIndex] = temp;
}



// Implementing merge sort
function mSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);

    left = mSort(left);
    right = mSort(right);
    return merge(left, right, array);
};

function merge(left, right, array) {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array[outputIndex++] = left[leftIndex++];
        }
        else {
            array[outputIndex++] = right[rightIndex++];
        }
    }

    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
    }

    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
    }
    return array;
};



// Sorting a linked list using merge sort
function linkedListSort() {
    const list = new List.LinkedList()

    list.insertFirst('5')
    list.insertFirst('8')
    list.insertFirst('2')
    list.insertFirst('1')
    list.insertFirst('4')
    list.insertFirst('9')

    let arrToSort = []

    function findLast(list) {
        let node = list.head
        while (node.next !== null) {
            node = node.next
        }
        return node.value
    }

    function isEmpty(list) {
        return (!list.head ? true : false)
    }

    while (isEmpty(list) === false) {
        arrToSort.push(findLast(list))
        list.remove(findLast(list))
    }

    arrToSort = mSort(arrToSort)

    for (let i = 0; i < arrToSort.length; i++) {
        list.insertLast(arrToSort[i])
    }


    function display(list) {

        let node = list.head;
        while (node !== null) {
            console.log(node.value)
            node = node.next
        }
    }

    console.log(display(list))
}



// Bucket sort
function bucketSort(array, bucketSize) {
    if (array.length === 0) {
        return array;
    }

    var i,
        minValue = array[0],
        maxValue = array[0],
        bucketSize = bucketSize || 5;

    array.forEach(function (currentVal) {
        if (currentVal < minValue) {
            minValue = currentVal;
        } else if (currentVal > maxValue) {
            maxValue = currentVal;
        }
    })

    var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    var allBuckets = new Array(bucketCount);

    for (i = 0; i < allBuckets.length; i++) {
        allBuckets[i] = [];
    }

    array.forEach(function (currentVal) {
        allBuckets[Math.floor((currentVal - minValue) / bucketSize)].push(currentVal);
    });

    array.length = 0;

    allBuckets.forEach(function (bucket) {
        insertionSort(bucket);
        bucket.forEach(function (element) {
            array.push(element)
        });
    });

    return array;
}

function insertionSort(array) {
    var length = array.length;

    for (var i = 1; i < length; i++) {
        var temp = array[i];
        for (var j = i - 1; j >= 0 && array[j] > temp; j--) {
            array[j + 1] = array[j];
        }
        array[j + 1] = temp;
    }

    return array;
}



// Sort in place
function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}
var myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(shuffle(myArray));

// Sorting books
// Can't we just use merge sort?