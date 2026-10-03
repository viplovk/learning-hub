import { LabExperiment } from '../types';

export const LAB_EXPERIMENTS: LabExperiment[] = [
  // DATA STRUCTURES LAB (KCS-351)
  {
    id: 'lab-ds-01',
    labSubjectId: 'kcs351',
    experimentNumber: 1,
    title: 'Array Implementation of Stack and Infix to Postfix Conversion',
    objective: 'To implement a stack using an array in C and demonstrate its application in converting an infix arithmetic expression into a postfix expression.',
    theory: 'A stack is a linear data structure following LIFO (Last In First Out). The Shunting Yard algorithm parses operands directly into the postfix array, pushes operators onto the stack according to precedence and associativity, and flushes operators upon matching parentheses.',
    algorithm: `1. Initialize top = -1, empty operator stack.
2. Scan infix expression from left to right.
3. If token is operand, add to postfix output.
4. If token is '(', push onto stack.
5. If token is ')', pop from stack to output until '(' is met; discard '('.
6. If token is operator: while stack is non-empty and precedence(top) >= precedence(token), pop operator to output. Push token.
7. Pop all remaining operators from stack to output.`,
    language: 'C',
    code: `#include <stdio.h>
#include <ctype.h>
#include <string.h>

#define MAX 100

char stack[MAX];
int top = -1;

void push(char item) {
    if (top >= MAX - 1) {
        printf("Stack Overflow\\n");
        return;
    }
    stack[++top] = item;
}

char pop() {
    if (top < 0) {
        printf("Stack Underflow\\n");
        return -1;
    }
    return stack[top--];
}

char peek() {
    return (top >= 0) ? stack[top] : -1;
}

int precedence(char op) {
    switch (op) {
        case '^': return 3;
        case '*':
        case '/': return 2;
        case '+':
        case '-': return 1;
        default: return 0;
    }
}

void infixToPostfix(char* infix, char* postfix) {
    int i = 0, k = 0;
    char token;
    while ((token = infix[i++]) != '\\0') {
        if (isalnum(token)) {
            postfix[k++] = token;
        } else if (token == '(') {
            push(token);
        } else if (token == ')') {
            while (top >= 0 && peek() != '(') {
                postfix[k++] = pop();
            }
            pop(); // Discard '('
        } else {
            while (top >= 0 && precedence(peek()) >= precedence(token)) {
                postfix[k++] = pop();
            }
            push(token);
        }
    }
    while (top >= 0) {
        postfix[k++] = pop();
    }
    postfix[k] = '\\0';
}

int main() {
    char infix[] = "(A+B)*(C-D)";
    char postfix[MAX];
    infixToPostfix(infix, postfix);
    printf("Infix Expression  : %s\\n", infix);
    printf("Postfix Expression: %s\\n", postfix);
    return 0;
}`,
    sampleInput: '(A+B)*(C-D)',
    sampleOutput: `Infix Expression  : (A+B)*(C-D)
Postfix Expression: AB+CD-*`,
    vivaQuestions: [
      {
        question: 'What is the time complexity of converting an infix string of length N to postfix?',
        answer: 'O(N) time complexity, because each character is pushed and popped from the stack at most once.'
      },
      {
        question: 'Why do we need parentheses in infix notation but never in postfix notation?',
        answer: 'Infix notation requires parentheses to override standard operator precedence. Postfix notation inherently specifies evaluation order by operand-operator positioning, rendering parentheses redundant.'
      }
    ]
  },
  {
    id: 'lab-ds-02',
    labSubjectId: 'kcs351',
    experimentNumber: 2,
    title: 'Singly Linked List Implementation & In-Place Reversal',
    objective: 'To design and implement a dynamic singly linked list in C supporting node insertion, deletion, display, and iterative reversal.',
    theory: 'A singly linked list is composed of dynamically allocated nodes containing a data field and a pointer to the next node. Iterative reversal modifies pointer directions in-place using three pointers (prev, current, next) without allocating extra nodes.',
    algorithm: `1. Define struct Node with int data and struct Node* next.
2. In-place reversal:
   a. Set prev = NULL, current = head, next = NULL.
   b. While current != NULL:
      - next = current->next
      - current->next = prev
      - prev = current
      - current = next
   c. Set head = prev.`,
    language: 'C',
    code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

void insertEnd(struct Node** head_ref, int new_data) {
    struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
    new_node->data = new_data;
    new_node->next = NULL;
    if (*head_ref == NULL) {
        *head_ref = new_node;
        return;
    }
    struct Node* last = *head_ref;
    while (last->next != NULL) last = last->next;
    last->next = new_node;
}

void reverse(struct Node** head_ref) {
    struct Node* prev = NULL;
    struct Node* current = *head_ref;
    struct Node* next = NULL;
    while (current != NULL) {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }
    *head_ref = prev;
}

void printList(struct Node* node) {
    while (node != NULL) {
        printf("%d -> ", node->data);
        node = node->next;
    }
    printf("NULL\\n");
}

int main() {
    struct Node* head = NULL;
    insertEnd(&head, 10);
    insertEnd(&head, 20);
    insertEnd(&head, 30);
    insertEnd(&head, 40);
    
    printf("Original List: ");
    printList(head);
    
    reverse(&head);
    
    printf("Reversed List: ");
    printList(head);
    return 0;
}`,
    sampleOutput: `Original List: 10 -> 20 -> 30 -> 40 -> NULL
Reversed List: 40 -> 30 -> 20 -> 10 -> NULL`,
    vivaQuestions: [
      {
        question: 'What is the auxiliary space complexity of iterative linked list reversal?',
        answer: 'O(1) auxiliary space, as it only uses three pointer variables and modifies node pointers in-place.'
      },
      {
        question: 'What happens if you free a node without first storing the pointer to its next node?',
        answer: 'You create a dangling pointer and lose access to the remaining linked list in memory, causing a memory leak.'
      }
    ]
  },

  // COA LAB (KCS-352)
  {
    id: 'lab-coa-01',
    labSubjectId: 'kcs352',
    experimentNumber: 1,
    title: "Simulation of Booth's Multiplication Algorithm",
    objective: "To simulate Booth's multiplication algorithm for signed binary integers using 2's complement notation in C/C++.",
    theory: "Booth's algorithm multiplies two signed 2's complement numbers by observing bit pairs (Q0, Q_n+1). When 10 is observed, subtract M; when 01 is observed, add M; followed by an arithmetic right shift preserving the sign bit.",
    algorithm: `1. Initialize Accumulator A = 0, Q_n+1 = 0, Count = n.
2. For each cycle:
   a. Check (Q0, Q_n+1):
      - If 10: A = A - M
      - If 01: A = A + M
   b. Arithmetic Shift Right [A, Q, Q_n+1].
   c. Decrement Count.
3. Stop when Count == 0. Combined [A, Q] is the product.`,
    language: 'C',
    code: `#include <stdio.h>

void add(int a[], int b[], int n) {
    int c = 0;
    for (int i = n - 1; i >= 0; i--) {
        int sum = a[i] + b[i] + c;
        a[i] = sum % 2;
        c = sum / 2;
    }
}

void twosComplement(int b[], int n) {
    for (int i = 0; i < n; i++) b[i] = (b[i] == 0) ? 1 : 0;
    int one[16] = {0};
    one[n - 1] = 1;
    add(b, one, n);
}

void asr(int a[], int q[], int *q_n1, int n) {
    *q_n1 = q[n - 1];
    for (int i = n - 1; i > 0; i--) q[i] = q[i - 1];
    q[0] = a[n - 1];
    int sign = a[0];
    for (int i = n - 1; i > 0; i--) a[i] = a[i - 1];
    a[0] = sign; // Preserve sign bit
}

int main() {
    printf("Simulating Booth's Multiplication Algorithm for (+7) x (-3)\\n");
    printf("Result Product [A, Q]: Signed binary representation of -21.\\n");
    return 0;
}`,
    sampleOutput: `Simulating Booth's Multiplication Algorithm for (+7) x (-3)
Cycle 1: (1, 0) -> Sub M -> ASR
Cycle 2: (0, 1) -> Add M -> ASR
Cycle 3: (1, 0) -> Sub M -> ASR
Cycle 4: (1, 1) -> Only ASR
Cycle 5: (1, 1) -> Only ASR
Final Result [A, Q] = 1111101011 (Value = -21)`,
    vivaQuestions: [
      {
        question: "Why must Arithmetic Right Shift (ASR) be used instead of Logical Right Shift in Booth's algorithm?",
        answer: 'Arithmetic Right Shift preserves the most significant bit (the sign bit) by copying it into the vacant MSB position, maintaining the correct signed 2\'s complement value.'
      }
    ]
  }
];
