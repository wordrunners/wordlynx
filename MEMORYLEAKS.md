## Using Devtools:

### Memory tab

In the Select JavaScript VM instance section

Total JS heap size on pages:
```
Start, Forum, LeaderBoard: about 11MB
Game: about 13MB
```

When using the application and cycling through pages, the values ​​stabilize at the initial values.

Snapshots were created after the page load and after use. The snapshots are approximately the same size.

### Recorder tab

Recordings were made with the Memory checkbox.

``
Recording start: application launch
Recording end: after all pages have been navigated
```

The graph with memory usage data shows no periodic spikes or increases in memory.

### Conclusion:

No memory leaks detected