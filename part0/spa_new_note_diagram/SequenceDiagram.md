sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser sends the note

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 created
    deactivate server

    Note right of browser: The browser redraws the notes