import sys
from bisect import bisect_right


def main() -> None:
    data = sys.stdin.buffer.read().split()
    if not data:
        return

    it = iter(map(int, data))
    n = next(it)
    q = next(it)

    c = [next(it) for _ in range(n)]
    t = [next(it) for _ in range(n)]

    d = [c[i] - t[i] for i in range(n)]
    d.sort()

    out_lines: list[str] = []
    for _ in range(q):
        v = next(it)
        s = next(it)
        pos = bisect_right(d, s)  # first index where d[pos] > s
        out_lines.append("YES" if (n - pos) >= v else "NO")

    sys.stdout.write("\n".join(out_lines) + ("\n" if out_lines else ""))


if __name__ == "__main__":
    main()
