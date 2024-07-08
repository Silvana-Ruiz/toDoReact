
import fetchMock from 'jest-fetch-mock';

describe('getAllToDos', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch todos successfully and set state', async () => {
    const mockData = [
        {
            "id": "a8ff11ea-83ff-413a-aad0-2b244fefd0e6",
            "text": "tarea 1",
            "dueDate": "2024-06-13",
            "doneFlag": false,
            "doneDate": null,
            "priority": "Low",
            "creationDate": "2024-07-07T23:36:20.785969"
        },
        {
            "id": "69d8218a-3ce4-4f8a-b41b-a540c08cee31",
            "text": "tarea 2",
            "dueDate": "2024-06-24",
            "doneFlag": false,
            "doneDate": null,
            "priority": "High",
            "creationDate": "2024-07-07T23:36:53.974057"
        },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    // Mock the setToDoList function
    const setToDoList = jest.fn();

    // Call the function
    await getAllToDos(setToDoList);

    // Assertions
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:9090/todo?text=&state=All&priority=All', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    expect(setToDoList).toHaveBeenCalledWith(mockData);
  });

  it('should handle fetch error', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to fetch todos'));

    // Mock the setToDoList function
    const setToDoList = jest.fn();


   
  });
});
