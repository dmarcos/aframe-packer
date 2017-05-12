A-Frame packer is command line tool that lets bundle [A-Frame](https://aframe.io) with a Web runtime (Gecko) so you can distribute your WebVR app in app stores like [Steam](http://store.steampowered.com/) or [Itch.io](https://itch.io/).

It's based on [qbrt](https://github.com/mykmelez/qbrt) with a little bit of magic sprinkled on top.

---

- [How to use](#how-to-use)
- [Authors](#authors)

## How to use

### Setup

Install it:

```bash
npm install -g aframe-packer
```

You need to have a directory with your A-Frame app and an index.html. See the [example]

Before packing you can test that everything works by invoking *run* on your app directory:

```bash
aframe-packer run aframe_app_dir
```

Once you're happy with the result you can create a bundle

```bash
aframe-packer run aframe_app_dir
```

## Authors

- Diego Marcos ([@dmarcos](https://twitter.com/dmarcos))
